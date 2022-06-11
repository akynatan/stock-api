import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import City from '../infra/typeorm/entities/City';
import ICitysRepository from '../repositories/ICityRepository';

interface IRequest {
  city_id: string;
}

@injectable()
export default class DetailCityService {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICitysRepository,
  ) {}

  public async execute({ city_id }: IRequest): Promise<City> {
    const city = await this.cityRepository.findByID(city_id);

    if (!city) {
      throw new AppError('City not found.');
    }

    return city;
  }
}
