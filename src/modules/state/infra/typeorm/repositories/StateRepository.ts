import { getRepository, Repository } from 'typeorm';
import IStatesRepository from '@modules/state/repositories/IStateRepository';
import ICreateStateDTO from '@modules/state/dtos/ICreateStateDTO';

import AppError from '@shared/errors/AppError';
import State from '../entities/State';

export default class StatesRepository implements IStatesRepository {
  private ormRepository: Repository<State>;

  constructor() {
    this.ormRepository = getRepository(State);
  }


  public async findAll(): Promise<State[]> {
    const state = await this.ormRepository.find();
    return state;
  }

  public async findByState(state_id: string): Promise<State[]> {
    const state = await this.ormRepository.findOne({
      where: {
        state_id,
      },
    });

    return state;
  }

  public async findByID(id: string): Promise<State | undefined> {
    const state = await this.ormRepository.findOne(id, {});
    return state;
  }
}
