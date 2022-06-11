import { getRepository, Repository } from 'typeorm';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';

import Company from '../entities/Company';

export default class CompanysRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async findByName(name: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: { name },
    });

    return company;
  }

  public async create(companyData: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create(companyData);
    await this.ormRepository.save(company);
    return company;
  }

  public async listAll(): Promise<Company[]> {
    const companys = this.ormRepository.find();
    return companys;
  }
}
