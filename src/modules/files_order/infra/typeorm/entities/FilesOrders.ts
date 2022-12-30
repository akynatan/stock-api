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
import { Expose } from 'class-transformer';

import uploaConfig from '@config/upload';
import Order from '@modules/orders/infra/typeorm/entities/Order';

@Entity('files_orders')
export default class FilesOrders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  name_file: string;

  @Column()
  name_file_original: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'name_file_url' })
  getNameFileURL(): string | null {
    if (!this.name_file) {
      return null;
    }
    switch (uploaConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.name_file}`;
      case 's3':
        return `https://${uploaConfig.config.aws.bucket}.s3.us-east-1.amazonaws.com/${this.name_file}`;
      default:
        return null;
    }
  }
}
