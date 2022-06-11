import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import State from '../infra/typeorm/entities/State';
import IStatesRepository from '../repositories/IStateRepository';

interface IRequest {
  state_id: string;
}

@injectable()
export default class DetailStateService {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStatesRepository,
  ) {}

  public async execute({ state_id }: IRequest): Promise<State> {
    const state = await this.stateRepository.findByID(state_id);

    if (!state) {
      throw new AppError('State not found.');
    }

    return state;
  }
}
