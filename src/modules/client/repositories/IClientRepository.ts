import Client from '@modules/client/infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findAll(): Promise<Client[]>;
  findByID(id: string): Promise<Client | undefined>;
  findByDocument(document: string): Promise<Client | undefined>;
  save(client: Client): Promise<Client>;
  delete(id: string): Promise<void>;
}
