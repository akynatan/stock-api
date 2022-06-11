import ICreateModelDTO from '../dtos/ICreateModelDTO';
import Model from '../infra/typeorm/entities/Model';

export default interface IModelRepository {
  create(data: ICreateModelDTO): Promise<Model>;
  save(user: Model): Promise<Model>;
  findByID(id: string): Promise<Model | undefined>;
  findByName(name: string): Promise<Model | undefined>;
  findAll(): Promise<Model[]>;
  delete(id: string): Promise<void>;
}
