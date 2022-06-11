/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICityRepository from '@modules/city/repositories/ICityRepository';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISuppliersRepository from '../repositories/ISuppliersRepository';

interface IRequest {
  supplier_id: string;
  name_social_reason: string;
  name_fantasy: string;
  cnpj: string;
  tel: string;
  tel2: string;
  domain: string;
  city_id: string;
  neighborhood: string;
  street: string;
  cep: string;
  number: string;
  complement: string;
  representative_name: string;
  mail: string;
  mail2: string;
  logo: string;
  note: string;
}

@injectable()
export default class UpdateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('CityRepository')
    private cityRepository: ICityRepository,
  ) {}

  public async execute({
    supplier_id,
    name_social_reason,
    name_fantasy,
    cnpj,
    tel,
    tel2,
    domain,
    city_id,
    neighborhood,
    street,
    cep,
    number,
    complement,
    representative_name,
    mail,
    mail2,
    logo,
    note,
  }: IRequest): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findByID(
      supplier_id,
      false,
    );

    if (!supplier) {
      throw new AppError('Supplier not found');
    }

    const city = await this.cityRepository.findByID(city_id);

    if (!city) {
      throw new AppError('City not exists');
    }

    const supplierAlreadExists = await this.suppliersRepository.findByCNPJ(
      cnpj,
      false,
    );

    if (supplierAlreadExists && supplierAlreadExists.id !== supplier_id) {
      throw new AppError('Supplier alread exists with document');
    }

    supplier.name_social_reason = name_social_reason;
    supplier.name_fantasy = name_fantasy;
    supplier.cnpj = cnpj;
    supplier.tel = tel;
    supplier.tel2 = tel2;
    supplier.domain = domain;
    supplier.city_id = city_id;
    supplier.neighborhood = neighborhood;
    supplier.street = street;
    supplier.cep = cep;
    supplier.number = number;
    supplier.complement = complement;
    supplier.representative_name = representative_name;
    supplier.mail = mail;
    supplier.mail2 = mail2;
    supplier.logo = logo;
    supplier.note = note;

    await this.suppliersRepository.save(supplier);
    await this.cacheProvider.invalidate(`suppliers-list`);

    return supplier;
  }
}
