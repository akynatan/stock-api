import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICityRepository from '@modules/city/repositories/ICityRepository';
import Client from '../infra/typeorm/entities/Client';
import IClientRepository from '../repositories/IClientRepository';

interface IRequest {
  client_id: string;
  name: string;
  document: string;
  tel: string;
  tel2: string;
  city_id: string;
  neighborhood: string;
  street: string;
  cep: string;
  number: string;
  complement: string;
  mail: string;
  note: string;
}

@injectable()
export default class UpdateClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('CityRepository')
    private cityRepository: ICityRepository,
  ) {}

  public async execute({
    client_id,
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
    const client = await this.clientRepository.findByID(client_id);

    if (!client) {
      throw new AppError('Client not found');
    }

    const city = await this.cityRepository.findByID(city_id);

    if (!city) {
      throw new AppError('City not exists');
    }

    const clientAlreadExists = await this.clientRepository.findByDocument(
      document,
    );

    if (clientAlreadExists && clientAlreadExists.id !== client_id) {
      throw new AppError('Client alread exists with document');
    }

    client.name = name;
    client.document = document;
    client.tel = tel;
    client.tel2 = tel2;
    client.city = city;
    client.neighborhood = neighborhood;
    client.street = street;
    client.cep = cep;
    client.number = number;
    client.complement = complement;
    client.mail = mail;
    client.note = note;

    await this.clientRepository.save(client);
    await this.cacheProvider.invalidate(`clients-list`);

    return client;
  }
}
