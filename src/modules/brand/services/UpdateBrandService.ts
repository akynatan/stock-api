import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandRepository';

interface IRequest {
  brand_id: string;
  name: string;
}

@injectable()
export default class UpdateBrandService {
  constructor(
    @inject('BrandRepository')
    private brandRepository: IBrandsRepository,
  ) {}

  public async execute({ brand_id, name }: IRequest): Promise<Brand> {
    const brand = await this.brandRepository.findByID(brand_id);

    if (!brand) {
      throw new AppError('Brand not found.');
    }

    const checkBrandExists = await this.brandRepository.findByName(name);

    if (checkBrandExists) {
      throw new AppError('Name already used.');
    }

    brand.name = name;

    await this.brandRepository.save(brand);

    return brand;
  }
}
