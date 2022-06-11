import { injectable, inject } from 'tsyringe';

import Manufacturer from '../infra/typeorm/entities/Manufacturer';
import IManufacturersRepository from '../repositories/IManufacturerRepository';

@injectable()
export default class ListManufacturerService {
  constructor(
    @inject('ManufacturerRepository')
    private manufacturerRepository: IManufacturersRepository,
  ) {}

  public async execute(): Promise<Manufacturer[]> {
    const manufacturer = await this.manufacturerRepository.findAll();

    return manufacturer;
  }
}
