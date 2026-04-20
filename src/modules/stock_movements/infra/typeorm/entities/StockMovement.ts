import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import Client from '@modules/client/infra/typeorm/entities/Client';

@Entity('stock_movements')
export default class StockMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column()
  type: string;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ type: 'numeric' })
  stock_after: number;

  @Column()
  reason: string;

  @Column({ nullable: true })
  supplier_id: string;

  @Column({ nullable: true })
  client_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @CreateDateColumn()
  created_at: Date;
}
