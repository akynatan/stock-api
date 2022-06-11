import { getRepository, Repository } from 'typeorm';
import IManufacturersRepository from '@modules/manufacturer/repositories/IManufacturerRepository';
import ICreateManufacturerDTO from '@modules/manufacturer/dtos/ICreateManufacturerDTO';

import AppError from '@shared/errors/AppError';
import Manufacturer from '../entities/Manufacturer';

export default class ManufacturersRepository
  implements IManufacturersRepository
{
  private ormRepository: Repository<Manufacturer>;

  constructor() {
    this.ormRepository = getRepository(Manufacturer);
  }

  public async save(manufacturer: Manufacturer): Promise<Manufacturer> {
    await this.ormRepository.save(manufacturer);
    return manufacturer;
  }

  public async create(
    manufacturerData: ICreateManufacturerDTO,
  ): Promise<Manufacturer> {
    const manufacturer = this.ormRepository.create(manufacturerData);
    await this.ormRepository.save(manufacturer);
    return manufacturer;
  }

  public async findAll(): Promise<Manufacturer[]> {
    const manufacturer = await this.ormRepository.find();
    return manufacturer;
  }

  public async findByName(name: string): Promise<Manufacturer | undefined> {
    const manufacturer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return manufacturer;
  }

  public async findByID(id: string): Promise<Manufacturer | undefined> {
    const manufacturer = await this.ormRepository.findOne(id, {});
    return manufacturer;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      console.log(err);
      throw new AppError('Erro to delete manufacturer');
    }
  }
}
