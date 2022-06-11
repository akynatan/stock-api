import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompanysRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  listAll(): Promise<Company[]>;
  findByName(name: string): Promise<Company | undefined>;
}
