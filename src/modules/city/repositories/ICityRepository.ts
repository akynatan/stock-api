import City from '../infra/typeorm/entities/City';

export default interface ICityRepository {
  findByID(id: string): Promise<City | undefined>;
  findByState(state_id: string): Promise<City[]>;
  findAll(): Promise<City[]>;
}
