import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Brand from '../infra/typeorm/entities/Brand';
import IBrandRepository from '../repositories/IBrandRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateBrandService {
  constructor(
    @inject('BrandRepository')
    private brandRepository: IBrandRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<Brand> {
    const checkBrandExists = await this.brandRepository.findByName(name);

    if (checkBrandExists) {
      throw new AppError('Name already used.');
    }

    const brand = await this.brandRepository.create({
      name,
    });

    await this.cacheProvider.invalidatePrefix('brand-list');

    return brand;
  }
}
