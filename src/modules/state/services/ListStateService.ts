import { injectable, inject } from 'tsyringe';

import State from '../infra/typeorm/entities/State';
import IStatesRepository from '../repositories/IStateRepository';

@injectable()
export default class ListStateService {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStatesRepository,
  ) {}

  public async execute(): Promise<State[]> {
    const state = await this.stateRepository.findAll();

    return state;
  }
}
