import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Manufacturer from '../infra/typeorm/entities/Manufacturer';
import IManufacturersRepository from '../repositories/IManufacturerRepository';

interface IRequest {
  manufacturer_id: string;
}

@injectable()
export default class DeleteManufacturerService {
  constructor(
    @inject('ManufacturerRepository')
    private manufacturerRepository: IManufacturersRepository,
  ) {}

  public async execute({ manufacturer_id }: IRequest): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findByID(
      manufacturer_id,
    );

    if (!manufacturer) {
      throw new AppError('Manufacturer not found.');
    }

    await this.manufacturerRepository.delete(manufacturer_id);

    return manufacturer;
  }
}
