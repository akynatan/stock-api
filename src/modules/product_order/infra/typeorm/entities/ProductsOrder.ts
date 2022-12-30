/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import ProductSupplier from '@modules/products/infra/typeorm/entities/ProductSupplier';
import Order from '@modules/orders/infra/typeorm/entities/Order';

@Entity('product_order')
export default class ProductsOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_supplier_id: string;

  @OneToOne(() => ProductSupplier)
  @JoinColumn({ name: 'product_supplier_id' })
  product_supplier: ProductSupplier;

  @Column()
  order_id: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column('decimal', { precision: 5, scale: 2 })
  unit_price: number;

  @Column()
  qtd: number;

  @Column()
  note: string;

  @Column('decimal', { precision: 5, scale: 2 })
  label: number;

  @Column('decimal', { precision: 5, scale: 2 })
  prep: number;

  @Column('decimal', { precision: 5, scale: 2 })
  other_cost: number;

  @Column('decimal', { precision: 5, scale: 2 })
  buy_box: number;

  @Column('decimal', { precision: 5, scale: 2 })
  amazon_fee: number;

  @Column('decimal', { precision: 5, scale: 2 })
  cog: number;

  @Column('decimal', { precision: 5, scale: 2 })
  gross_profit: number;

  @Column('decimal', { precision: 5, scale: 2 })
  shipment_amazon: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
