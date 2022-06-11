import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Client from '../infra/typeorm/entities/Client';
import IClientRepository from '../repositories/IClientRepository';

interface IRequest {
  client_id: string;
}

@injectable()
export default class DetailClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ client_id }: IRequest): Promise<Client> {
    const client = await this.clientRepository.findByID(client_id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    // await this.cacheProvider.invalidate('products-list');

    return client;
  }
}
