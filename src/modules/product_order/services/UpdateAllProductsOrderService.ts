import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';

interface ICreateProductsOrderServiceDTO {
  id: string;
  qtd: number;
  unit_price: number;
  label: number;
  prep: number;
  other_cost: number;
  buy_box: number;
  note: string;
  cog: number;
  gross_profit: number;
  shipment_amazon: number;
}

@injectable()
export default class UpdateAllProductsOrderService {
  constructor(
    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    data: ICreateProductsOrderServiceDTO[],
  ): Promise<ProductsOrder[]> {
    const allProducts = data.map(async product_order => {
      const product_order_mapped = await this.productsOrderRepository.findByID(
        product_order.id,
      );

      if (!product_order_mapped) {
        return product_order as unknown as ProductsOrder;
      }

      product_order_mapped.qtd = product_order.qtd;
      product_order_mapped.unit_price = product_order.unit_price;
      product_order_mapped.label = product_order.label;
      product_order_mapped.prep = product_order.prep;
      product_order_mapped.other_cost = product_order.other_cost;
      product_order_mapped.buy_box = product_order.buy_box;
      product_order_mapped.note = product_order.note;
      product_order_mapped.cog = product_order.cog;
      product_order_mapped.gross_profit = product_order.gross_profit;
      product_order_mapped.shipment_amazon = product_order.shipment_amazon;
      product_order_mapped.note = product_order.note;

      return this.productsOrderRepository.save(product_order_mapped);
    });

    return Promise.all(allProducts);
  }
}
