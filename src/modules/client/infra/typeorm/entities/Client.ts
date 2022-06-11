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

import City from '@modules/city/infra/typeorm/entities/City';

@Entity('client')
export default class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column({ nullable: true })
  tel: string;

  @Column({ nullable: true })
  tel2: string;

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
  mail: string;

  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;
}
