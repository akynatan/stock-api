import { getRepository, Repository } from 'typeorm';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import ICreateSupplierDTO from '@modules/suppliers/dtos/ICreateSupplierDTO';

import AppError from '@shared/errors/AppError';
import Supplier from '../entities/Supplier';

export default class SuppliersRepository implements ISuppliersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = getRepository(Supplier);
  }

  public async create(supplierData: ICreateSupplierDTO): Promise<Supplier> {
    const supplier = this.ormRepository.create(supplierData);
    await this.ormRepository.save(supplier);

    return supplier;
  }

  public async findAll(relations: boolean): Promise<Supplier[]> {
    const suppliers = this.ormRepository.find({
      relations: relations ? ['city', 'city.state'] : [],
    });
    return suppliers;
  }

  public async findByID(
    id: string,
    relations: boolean,
  ): Promise<Supplier | undefined> {
    const supplier = this.ormRepository.findOne(id, {
      relations: relations ? ['city', 'city.state'] : [],
    });
    return supplier;
  }

  public async findByCNPJ(
    cnpj_or_cpf: string,
    relations: boolean,
  ): Promise<Supplier | undefined> {
    const supplier = this.ormRepository.findOne({
      where: {
        cnpj: cnpj_or_cpf,
      },
      relations: relations ? ['city', 'city.state'] : [],
    });

    return supplier;
  }

  public async save(supplier: Supplier): Promise<Supplier> {
    await this.ormRepository.save(supplier);
    return supplier;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      throw new AppError('Error to delete supplier');
    }
  }
}
