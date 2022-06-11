import { injectable, inject, container } from 'tsyringe';

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
  product_id: string;
  name: string;
  code: string;
  description?: string;
  brand_id?: string;
  model_id?: string;
  category_id?: string;
  manufacturer_id?: string;
  new_brand?: string;
  new_model?: string;
  new_category?: string;
  new_manufacturer?: string;
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
export default class UpdateProductService {
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
    product_id,
    name,
    code,
    brand_id,
    category_id,
    manufacturer_id,
    model_id,
    description,
    new_brand,
    new_category,
    new_manufacturer,
    measure_unit,
    new_model,
  }: IRequest): Promise<Product> {
    const createBrand = container.resolve(CreateBrandService);
    const createModel = container.resolve(CreateModelService);
    const createCategory = container.resolve(CreateCategoryService);
    const createManufacturer = container.resolve(CreateManufacturerService);

    const product = await this.productsRepository.findByID(product_id, false);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const checkProductWithCodeExists = await this.productsRepository.findByCode(
      code,
      false,
    );

    if (
      checkProductWithCodeExists &&
      checkProductWithCodeExists.id !== product_id
    ) {
      throw new AppError('Code already used in outer product.');
    }

    let brand;
    if (!brand_id && new_brand) {
      brand = await createBrand.execute({ name: new_brand });
    } else if (brand_id) {
      brand = await this.brandRepository.findByID(brand_id);
    }

    if (!brand) {
      throw new AppError('Brand not found');
    }

    let model;
    if (!model_id && new_model) {
      model = await createModel.execute({ name: new_model });
    } else if (model_id) {
      model = await this.modelRepository.findByID(model_id);
    }

    if (!model) {
      throw new AppError('Brand not found');
    }

    let category;
    if (!category_id && new_category) {
      category = await createCategory.execute({ name: new_category });
    } else if (category_id) {
      category = await this.categoryRepository.findByID(category_id);
    }
    if (!category) {
      throw new AppError('Brand not found');
    }

    let manufacturer;
    if (!manufacturer_id && new_manufacturer) {
      manufacturer = await createManufacturer.execute({
        name: new_manufacturer,
      });
    } else if (manufacturer_id) {
      manufacturer = await this.manufacturerRepository.findByID(
        manufacturer_id,
      );
    }
    if (!manufacturer) {
      throw new AppError('Brand not found');
    }

    product.name = name;
    product.code = code;
    console.log(measure_unit);
    product.measure_unit = measure_unit;
    if (description) {
      product.description = description;
    }
    product.brand_id = brand.id;
    product.model_id = model.id;
    product.category_id = category.id;
    product.manufacturer_id = manufacturer.id;

    await this.productsRepository.save(product);

    await this.cacheProvider.invalidatePrefix('products-list');

    return product;
  }
}
