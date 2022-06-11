/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import uploaConfig from '@config/upload';

@Entity('company')
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'logo_url' })
  getAvatarUrl(): string | null {
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
