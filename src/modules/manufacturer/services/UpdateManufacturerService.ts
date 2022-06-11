import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Manufacturer from '../infra/typeorm/entities/Manufacturer';
import IManufacturersRepository from '../repositories/IManufacturerRepository';

interface IRequest {
  manufacturer_id: string;
  name: string;
}

@injectable()
export default class UpdateManufacturerService {
  constructor(
    @inject('ManufacturerRepository')
    private manufacturerRepository: IManufacturersRepository,
  ) {}

  public async execute({ manufacturer_id, name }: IRequest): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findByID(manufacturer_id);

    if (!manufacturer) {
      throw new AppError('Manufacturer not found.');
    }

    const checkManufacturerExists = await this.manufacturerRepository.findByName(name);

    if (checkManufacturerExists) {
      throw new AppError('Name already used.');
    }

    manufacturer.name = name;

    await this.manufacturerRepository.save(manufacturer);

    return manufacturer;
  }
}
