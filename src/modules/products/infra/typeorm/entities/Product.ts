import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import uploaConfig from '@config/upload';
import ProductSupplier from '@modules/products/infra/typeorm/entities/ProductSupplier';
import Brand from '@modules/brand/infra/typeorm/entities/Brand';
import Model from '@modules/model/infra/typeorm/entities/Model';
import Category from '@modules/category/infra/typeorm/entities/Category';
import Manufacturer from '@modules/manufacturer/infra/typeorm/entities/Manufacturer';

@Entity('product')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  brand_id: string;

  @Column({ nullable: true })
  model_id: string;

  @Column({ nullable: true })
  category_id: string;

  @Column({ nullable: true })
  manufacturer_id: string;

  @OneToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToOne(() => Model)
  @JoinColumn({ name: 'model_id' })
  model: Brand;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne(() => Manufacturer)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

  @Column()
  image: string;

  @Column({ nullable: true })
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

  // @OneToMany(
  //   () => ProductSupplier,
  //   product_supplier => product_supplier.products,
  // )
  // product_suppliers: ProductSupplier[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }
    switch (uploaConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;
      case 's3':
        return `https://${uploaConfig.config.aws.bucket}.s3.us-east-1.amazonaws.com/${this.image}`;
      default:
        return null;
    }
  }
}
