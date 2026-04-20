import { injectable, inject } from 'tsyringe';
import { getManager } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import IClientRepository from '@modules/client/repositories/IClientRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IStockMovementsRepository from '../repositories/IStockMovementsRepository';
import StockMovement from '../infra/typeorm/entities/StockMovement';

interface IRequest {
  product_id: string;
  type: 'entrada' | 'saida';
  quantity: number;
  reason: string;
  supplier_id?: string;
  client_id?: string;
}

@injectable()
export default class CreateStockMovementService {
  constructor(
    @inject('StockMovementsRepository')
    private stockMovementsRepository: IStockMovementsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('ClientRepository')
    private clientRepository: IClientRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_id,
    type,
    quantity,
    reason,
    supplier_id,
    client_id,
  }: IRequest): Promise<StockMovement> {
    if (quantity <= 0) {
      throw new AppError('Quantity must be greater than zero');
    }

    if (type !== 'entrada' && type !== 'saida') {
      throw new AppError('Type must be "entrada" or "saida"');
    }

    if (type === 'entrada') {
      if (!supplier_id) {
        throw new AppError('Supplier is required for entry movements');
      }

      const supplierExists = await this.suppliersRepository.findByID(
        supplier_id,
        false,
      );

      if (!supplierExists) {
        throw new AppError('Supplier not found');
      }
    }

    if (type === 'saida') {
      if (!client_id) {
        throw new AppError('Client is required for exit movements');
      }

      const clientExists = await this.clientRepository.findByID(client_id);

      if (!clientExists) {
        throw new AppError('Client not found');
      }
    }

    const stockMovement = await getManager().transaction(
      async transactionalEntityManager => {
        const product = await transactionalEntityManager.findOne(Product, {
          where: { id: product_id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!product) {
          throw new AppError('Product not found');
        }

        const currentStock = Number(product.current_stock);
        let new_stock: number;

        if (type === 'entrada') {
          new_stock = currentStock + quantity;
        } else {
          new_stock = currentStock - quantity;

          if (new_stock < 0) {
            throw new AppError('Insufficient stock');
          }
        }

        const movement = transactionalEntityManager.create(StockMovement, {
          product_id,
          type,
          quantity,
          reason,
          supplier_id: type === 'entrada' ? supplier_id : undefined,
          client_id: type === 'saida' ? client_id : undefined,
          stock_after: new_stock,
        });

        await transactionalEntityManager.save(movement);

        product.current_stock = new_stock;
        await transactionalEntityManager.save(product);

        return movement;
      },
    );

    await this.cacheProvider.invalidatePrefix('products-list');

    return stockMovement;
  }
}
