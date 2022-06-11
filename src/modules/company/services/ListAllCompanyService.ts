import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Company from '../infra/typeorm/entities/Company';
import ICompanysRepository from '../repositories/ICompanyRepository';

@injectable()
export default class ListAllCompanysService {
  constructor(
    @inject('CompanysRepository')
    private companysRepository: ICompanysRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Company[]> {
    const companys = await this.companysRepository.listAll();

    return companys;
  }
}
