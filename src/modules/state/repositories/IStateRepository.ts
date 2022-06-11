import State from '../infra/typeorm/entities/State';

export default interface IStateRepository {
  findByID(id: string): Promise<State | undefined>;
  findByState(state_id: string): Promise<State[]>;
  findAll(): Promise<State[]>;
}
