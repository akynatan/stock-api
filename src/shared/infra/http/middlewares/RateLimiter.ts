import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
  // Evita fila infinita de comandos enquanto o Redis não conecta (requisição ficava sem resposta).
  enable_offline_queue: false,
  connect_timeout: 10_000,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 100,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    if (err instanceof RateLimiterRes) {
      throw new AppError('Too many requests', 429);
    }
    console.error('Rate limiter Redis error, allowing request:', err);
    return next();
  }
}
