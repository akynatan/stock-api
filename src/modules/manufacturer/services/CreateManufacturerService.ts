import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Manufacturer from '../infra/typeorm/entities/Manufacturer';
import IManufacturerRepository from '../repositories/IManufacturerRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ManufacturerRepository')
    private manufacturerRepository: IManufacturerRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<Manufacturer> {
    const checkManufacturerExists =
      await this.manufacturerRepository.findByName(name);

    if (checkManufacturerExists) {
      throw new AppError('Name already used.');
    }

    const manufacturer = await this.manufacturerRepository.create({
      name,
    });

    await this.cacheProvider.invalidatePrefix('manufacturer-list');

    return manufacturer;
  }
}
