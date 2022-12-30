import { getRepository, Repository } from 'typeorm';

import IClientRepository from '@modules/client/repositories/IClientRepository';
import ICreateClientDTO from '@modules/client/dtos/ICreateClientDTO';

import AppError from '@shared/errors/AppError';
import Client from '../entities/Client';

export default class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create(clientData);
    await this.ormRepository.save(client);

    return client;
  }

  public async findAll(): Promise<Client[]> {
    const clients = this.ormRepository.find({
      relations: ['city', 'city.state'],
    });
    return clients;
  }

  public async findByID(id: string): Promise<Client | undefined> {
    const client = this.ormRepository.findOne(id, { relations: ['city'] });
    return client;
  }

  public async findByDocument(document: string): Promise<Client | undefined> {
    const client = this.ormRepository.findOne({
      where: {
        document,
      },
    });

    return client;
  }

  public async save(client: Client): Promise<Client> {
    await this.ormRepository.save(client);
    return client;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      throw new AppError('Error to delete client');
    }
  }
}
