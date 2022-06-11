import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandRepository';

interface IRequest {
  brand_id: string;
}

@injectable()
export default class DetailBrandService {
  constructor(
    @inject('BrandRepository')
    private brandRepository: IBrandsRepository,
  ) {}

  public async execute({ brand_id }: IRequest): Promise<Brand> {
    const brand = await this.brandRepository.findByID(brand_id);

    if (!brand) {
      throw new AppError('Brand not found.');
    }

    return brand;
  }
}
