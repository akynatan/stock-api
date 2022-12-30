/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import ExcelToJson from 'convert-excel-to-json';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';
import IProductsRepository from '../../products/repositories/IProductsRepository';
import IProductSupplierRepository from '../../products/repositories/IProductSupplierRepository';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';

interface IRequest {
  file_name: string;
  supplier_id: string;
  order_id: string;
}

interface IResponse {
  products_order: ProductsOrder[];
  products_without_asin: string[];
  products_with_asin_duplicated: string[];
}

@injectable()
export default class UploadProductsOrderService {
  constructor(
    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    file_name,
    supplier_id,
    order_id,
  }: IRequest): Promise<IResponse> {
    const { data } = ExcelToJson({
      sourceFile: `${uploadConfig.tmpFolder}/${file_name}`,
    });

    const allProducts = data.slice(1, data.length);
    const products_without_asin: string[] = [];
    const products_with_asin_duplicated: string[] = [];

    const products_row = allProducts.map(async product => {
      const { A: asin, B: sku_supplier, C: unit_price, D: buy_box } = product;

      const products_by_asin = await this.productsRepository.findByASIN(asin);

      if (!products_by_asin) {
        products_without_asin.push(asin);
      }

      if (products_by_asin.length > 1) {
        products_with_asin_duplicated.push(asin);
      }

      const products_suppliers = await Promise.all(
        products_by_asin.map(async product_asin => {
          let product_supplier = product_asin.product_suppliers.find(
            p => p.supplier_id === supplier_id,
          );

          if (!product_supplier) {
            product_supplier = await this.productSupplierRepository.create({
              product_id: product_asin.id,
              supplier_id,
              sku_supplier,
            });
          }

          return { ...product_asin, product_suppliers: product_supplier };
        }),
      );

      const all_products_orders = products_suppliers.map(async product_s => {
        const product_order = await this.productsOrderRepository.create({
          product_supplier_id: product_s.product_suppliers.id,
          order_id,
          note: 'a',
          buy_box,
          unit_price,
        });

        const product_order_response =
          await this.productsOrderRepository.findByID(product_order.id);

        return product_order_response;
      });

      return Promise.all(all_products_orders);
    });

    const products_returned = await Promise.all(products_row);

    const all_products_orders_return: ProductsOrder[] = [];
    products_returned.forEach(pp =>
      pp.forEach(ppp => {
        if (ppp) all_products_orders_return.push(ppp);
      }),
    );

    try {
      await fs.promises.stat(`${uploadConfig.tmpFolder}/${file_name}`);
    } catch (err) {
      console.log(err);
    }

    return {
      products_order: all_products_orders_return,
      products_without_asin,
      products_with_asin_duplicated,
    };
  }
}
