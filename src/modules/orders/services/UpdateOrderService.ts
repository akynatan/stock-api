import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';
import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  order_id: string;
  supplier_id: string;
  form_payment: string;
  its_paid: boolean;
  total_charged: number;
  status: string;
  date: Date;
  invoice: string;
  note: string;
  other_cost: number;
  shipment_cost: number;
  sub_total: number;
  products: string[];
}

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    order_id,
    supplier_id,
    date,
    invoice,
    note,
    other_cost,
    shipment_cost,
    form_payment,
    its_paid,
    total_charged,
    status,
    sub_total,
    products,
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    if (order.supplier_id !== supplier_id) {
      delete order.supplier;
      order.supplier_id = supplier_id;

      await Promise.all(
        products.map(async product => {
          let product_supplier =
            await this.productSupplierRepository.findBySupplierProduct({
              product_id: product,
              supplier_id: order.supplier_id,
            });

          if (!product_supplier) {
            product_supplier = await this.productSupplierRepository.create({
              product_id: product,
              supplier_id: order.supplier_id,
            });
          }
        }),
      );
    }

    order.date = date;
    order.invoice = invoice;
    order.note = note;
    order.other_cost = other_cost;
    order.shipment_cost = shipment_cost;
    order.form_payment = form_payment;
    order.its_paid = its_paid;
    order.status = status;
    order.sub_total = sub_total;
    order.total_charged = total_charged;

    await this.ordersRepository.save(order);

    return order;
  }
}
