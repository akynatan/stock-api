import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: string;
  imageFileName: string;
}

@injectable()
export default class UpdateProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    product_id,
    imageFileName,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findByID(product_id, true);

    if (!product) {
      throw new AppError('Only authentication products can change image.', 401);
    }

    if (product.image) {
      await this.storageProvider.deleteFile(product.image);
    }

    const filename = await this.storageProvider.saveFile(imageFileName);

    product.image = filename;

    await this.productsRepository.save(product);

    return product;
  }
}
