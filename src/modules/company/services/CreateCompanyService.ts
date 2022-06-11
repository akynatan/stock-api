import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Company from '../infra/typeorm/entities/Company';
import ICompanysRepository from '../repositories/ICompanyRepository';

import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompanysRepository')
    private companysRepository: ICompanysRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: ICreateCompanyDTO): Promise<Company> {
    const checkCompanyExists = await this.companysRepository.findByName(name);

    if (checkCompanyExists) {
      throw new AppError('Name already used.');
    }

    const company = await this.companysRepository.create({
      name,
    });

    await this.cacheProvider.invalidatePrefix('company-list');

    return company;
  }
}
