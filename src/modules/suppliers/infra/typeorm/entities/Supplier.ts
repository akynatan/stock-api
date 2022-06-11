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
import City from '@modules/city/infra/typeorm/entities/City';

@Entity('supplier')
export default class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_social_reason: string;

  @Column()
  name_fantasy: string;

  @Column()
  cnpj: string;

  @Column({ nullable: true })
  tel: string;

  @Column({ nullable: true })
  tel2: string;

  @Column({ nullable: true })
  domain: string;

  @Column()
  city_id: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  representative_name: string;

  @Column({ nullable: true })
  mail: string;

  @Column({ nullable: true })
  mail2: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  note: string;

  @Column()
  active: boolean;

  // @OneToMany(
  //   () => ProductSupplier,
  //   product_supplier => product_supplier.suppliers,
  // )
  // product_suppliers: ProductSupplier[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Expose({ name: 'logo_url' })
  getLogoUrl(): string | null {
    if (!this.logo) {
      return null;
    }
    switch (uploaConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.logo}`;
      case 's3':
        return `https://${uploaConfig.config.aws.bucket}.s3.us-east-1.amazonaws.com/${this.logo}`;
      default:
        return null;
    }
  }
}
