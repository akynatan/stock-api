import { injectable, inject, container } from 'tsyringe';
import { validate as isUUID } from 'uuid';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IBrandRepository from '@modules/brand/repositories/IBrandRepository';
import IModelRepository from '@modules/model/repositories/IModelRepository';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import IManufacturerRepository from '@modules/manufacturer/repositories/IManufacturerRepository';
import CreateBrandService from '@modules/brand/services/CreateBrandService';
import CreateModelService from '@modules/model/services/CreateModelService';
import CreateCategoryService from '@modules/category/services/CreateCategoryService';
import CreateManufacturerService from '@modules/manufacturer/services/CreateManufacturerService';
import Product from '../infra/typeorm/entities/Product';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  code: string;
  description?: string;
  brand_id: string;
  model_id: string;
  category_id: string;
  manufacturer_id: string;
  measure_unit:
    | 'T'
    | 'KG'
    | 'G'
    | 'MG'
    | 'M³'
    | 'DM³'
    | 'CM³'
    | 'KM'
    | 'M'
    | 'CM'
    | 'DM'
    | 'MM';
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('BrandRepository')
    private brandRepository: IBrandRepository,

    @inject('ModelRepository')
    private modelRepository: IModelRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('ManufacturerRepository')
    private manufacturerRepository: IManufacturerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    code,
    brand_id,
    category_id,
    manufacturer_id,
    model_id,
    description,
    measure_unit,
  }: IRequest): Promise<Product> {
    const createBrand = container.resolve(CreateBrandService);
    const createModel = container.resolve(CreateModelService);
    const createCategory = container.resolve(CreateCategoryService);
    const createManufacturer = container.resolve(CreateManufacturerService);

    const checkProductWithCodeExists = await this.productsRepository.findByCode(
      code,
      false,
    );

    if (checkProductWithCodeExists) {
      throw new AppError('Code already used in outer product.');
    }

    let brand;
    if (brand_id && isUUID(brand_id)) {
      brand = await this.brandRepository.findByID(brand_id);
    } else {
      brand = await createBrand.execute({ name: brand_id });
    }

    if (!brand) {
      throw new AppError('Brand not found');
    }

    let model;
    if (model_id && isUUID(model_id)) {
      model = await this.modelRepository.findByID(model_id);
    } else {
      model = await createModel.execute({ name: model_id });
    }

    if (!model) {
      throw new AppError('Model not found');
    }

    let category;
    if (category_id && isUUID(category_id)) {
      category = await this.categoryRepository.findByID(category_id);
    } else {
      category = await createCategory.execute({ name: category_id });
    }

    if (!category) {
      throw new AppError('Category not found');
    }

    let manufacturer;
    if (manufacturer_id && isUUID(manufacturer_id)) {
      manufacturer = await this.manufacturerRepository.findByID(
        manufacturer_id,
      );
    } else {
      manufacturer = await createManufacturer.execute({
        name: manufacturer_id,
      });
    }
    if (!manufacturer) {
      throw new AppError('Manufacturer not found');
    }

    const product = await this.productsRepository.create({
      name,
      code,
      brand_id: brand.id,
      model_id: model.id,
      category_id: category.id,
      manufacturer_id: manufacturer.id,
      description,
      measure_unit,
    });

    await this.cacheProvider.invalidatePrefix('products-list');

    return product;
  }
}
