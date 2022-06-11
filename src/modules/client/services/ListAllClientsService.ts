import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Client from '../infra/typeorm/entities/Client';
import IClientRepository from '../repositories/IClientRepository';

@injectable()
export default class ListAllClientsService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.findAll();

    // await this.cacheProvider.invalidate(`clients`);

    return clients;
  }
}
