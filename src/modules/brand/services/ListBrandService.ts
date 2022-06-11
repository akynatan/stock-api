import { injectable, inject } from 'tsyringe';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandRepository';

@injectable()
export default class ListBrandService {
  constructor(
    @inject('BrandRepository')
    private brandRepository: IBrandsRepository,
  ) {}

  public async execute(): Promise<Brand[]> {
    const brand = await this.brandRepository.findAll();

    return brand;
  }
}
