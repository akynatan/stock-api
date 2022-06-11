import { getRepository, Repository } from 'typeorm';
import ICitysRepository from '@modules/city/repositories/ICityRepository';
import ICreateCityDTO from '@modules/city/dtos/ICreateCityDTO';

import AppError from '@shared/errors/AppError';
import City from '../entities/City';

export default class CitysRepository implements ICitysRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }


  public async findAll(): Promise<City[]> {
    const city = await this.ormRepository.find();
    return city;
  }

  public async findByState(state_id: string): Promise<City[]> {
    const city = await this.ormRepository.findOne({
      where: {
        state_id,
      },
    });

    return city;
  }

  public async findByID(id: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne(id, {});
    return city;
  }
}
