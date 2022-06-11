import { getRepository, Repository } from 'typeorm';
import IBrandsRepository from '@modules/brand/repositories/IBrandRepository';
import ICreateBrandDTO from '@modules/brand/dtos/ICreateBrandDTO';

import AppError from '@shared/errors/AppError';
import Brand from '../entities/Brand';

export default class BrandsRepository implements IBrandsRepository {
  private ormRepository: Repository<Brand>;

  constructor() {
    this.ormRepository = getRepository(Brand);
  }

  public async save(brand: Brand): Promise<Brand> {
    await this.ormRepository.save(brand);
    return brand;
  }

  public async create(brandData: ICreateBrandDTO): Promise<Brand> {
    const brand = this.ormRepository.create(brandData);
    await this.ormRepository.save(brand);
    return brand;
  }

  public async findAll(): Promise<Brand[]> {
    const brand = await this.ormRepository.find();
    return brand;
  }

  public async findByName(name: string): Promise<Brand | undefined> {
    const brand = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return brand;
  }

  public async findByID(id: string): Promise<Brand | undefined> {
    const brand = await this.ormRepository.findOne(id, {});
    return brand;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      console.log(err);
      throw new AppError('Erro to delete brand');
    }
  }
}
