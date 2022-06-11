import { injectable, inject } from 'tsyringe';

import City from '../infra/typeorm/entities/City';
import ICitysRepository from '../repositories/ICityRepository';

@injectable()
export default class ListCityService {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICitysRepository,
  ) {}

  public async execute(): Promise<City[]> {
    const city = await this.cityRepository.findAll();

    return city;
  }
}
