import ICreateManufacturerDTO from '../dtos/ICreateManufacturerDTO';
import Manufacturer from '../infra/typeorm/entities/Manufacturer';

export default interface IManufacturerRepository {
  create(data: ICreateManufacturerDTO): Promise<Manufacturer>;
  save(user: Manufacturer): Promise<Manufacturer>;
  findByID(id: string): Promise<Manufacturer | undefined>;
  findByName(name: string): Promise<Manufacturer | undefined>;
  findAll(): Promise<Manufacturer[]>;
  delete(id: string): Promise<void>;
}
