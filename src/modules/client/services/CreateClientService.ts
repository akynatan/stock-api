import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICityRepository from '@modules/city/repositories/ICityRepository';
import Client from '../infra/typeorm/entities/Client';
import IClientRepository from '../repositories/IClientRepository';

interface IRequest {
  name: string;
  document: string;
  tel?: string;
  tel2?: string;
  city_id: string;
  neighborhood?: string;
  street?: string;
  cep?: string;
  number?: string;
  complement?: string;
  mail?: string;
  note?: string;
}

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('CityRepository')
    private cityRepository: ICityRepository,
  ) {}

  public async execute({
    name,
    document,
    tel,
    tel2,
    city_id,
    neighborhood,
    street,
    cep,
    number,
    complement,
    mail,
    note,
  }: IRequest): Promise<Client> {
    const city = await this.cityRepository.findByID(city_id);

    if (!city) {
      throw new AppError('City not exists');
    }

    const clientAlreadExists = await this.clientRepository.findByDocument(
      document,
    );

    if (clientAlreadExists) {
      throw new AppError('Client alread exists with document');
    }

    const client = await this.clientRepository.create({
      name,
      document,
      tel,
      tel2,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      mail,
      note,
    });

    await this.cacheProvider.invalidate(`clients-list`);

    return client;
  }
}
