/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICityRepository from '@modules/city/repositories/ICityRepository';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISuppliersRepository from '../repositories/ISuppliersRepository';

interface IRequest {
  name_social_reason: string;
  name_fantasy: string;
  cnpj: string;
  tel?: string;
  tel2?: string;
  domain?: string;
  city_id: string;
  neighborhood?: string;
  street?: string;
  cep?: string;
  number?: string;
  complement?: string;
  representative_name?: string;
  mail?: string;
  mail2?: string;
  logo?: string;
  note?: string;
}

@injectable()
export default class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('CityRepository')
    private cityRepository: ICityRepository,
  ) {}

  public async execute({
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
    const city = await this.cityRepository.findByID(city_id);

    if (!city) {
      throw new AppError('City not exists');
    }

    const supplierAlreadExists = await this.suppliersRepository.findByCNPJ(
      cnpj,
      false,
    );

    if (supplierAlreadExists) {
      throw new AppError('Supplier alread exists with document');
    }

    const supplier = await this.suppliersRepository.create({
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
    });

    await this.cacheProvider.invalidate(`suppliers-list`);

    return supplier;
  }
}
