import ICreateBrandDTO from '../dtos/ICreateBrandDTO';
import Brand from '../infra/typeorm/entities/Brand';

export default interface IBrandRepository {
  create(data: ICreateBrandDTO): Promise<Brand>;
  save(user: Brand): Promise<Brand>;
  findByID(id: string): Promise<Brand | undefined>;
  findByName(name: string): Promise<Brand | undefined>;
  findAll(): Promise<Brand[]>;
  delete(id: string): Promise<void>;
}
