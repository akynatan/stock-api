/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import Product from './Product';

@Entity('product_supplier')
export default class ProductSupplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  supplier_id: string;

  @ManyToOne(() => Supplier, { primary: true })
  @JoinColumn({ name: 'supplier_id' })
  suppliers: Supplier[];

  @Column()
  product_id: string;

  @ManyToOne(() => Product, { primary: true })
  @JoinColumn({ name: 'product_id' })
  products: Product[];

  @Column()
  sku_supplier: string;

  @Column()
  note: string;

  @Column()
  restriction_to_buy: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
