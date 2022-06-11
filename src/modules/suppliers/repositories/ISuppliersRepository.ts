import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ICreateSupplierDTO from '../dtos/ICreateSupplierDTO';

export default interface ISuppliersRepository {
  create(data: ICreateSupplierDTO): Promise<Supplier>;
  findAll(relations: boolean): Promise<Supplier[]>;
  findByID(id: string, relations: boolean): Promise<Supplier | undefined>;
  findByCNPJ(
    cnpj_or_cpf: string,
    relations: boolean,
  ): Promise<Supplier | undefined>;
  save(supplier: Supplier): Promise<Supplier>;
  delete(id: string): Promise<void>;
}
