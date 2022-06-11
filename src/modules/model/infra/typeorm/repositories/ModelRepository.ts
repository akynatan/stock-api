import { getRepository, Repository } from 'typeorm';
import IModelsRepository from '@modules/model/repositories/IModelRepository';
import ICreateModelDTO from '@modules/model/dtos/ICreateModelDTO';

import AppError from '@shared/errors/AppError';
import Model from '../entities/Model';

export default class ModelsRepository implements IModelsRepository {
  private ormRepository: Repository<Model>;

  constructor() {
    this.ormRepository = getRepository(Model);
  }

  public async save(model: Model): Promise<Model> {
    await this.ormRepository.save(model);
    return model;
  }

  public async create(modelData: ICreateModelDTO): Promise<Model> {
    const model = this.ormRepository.create(modelData);
    await this.ormRepository.save(model);
    return model;
  }

  public async findAll(): Promise<Model[]> {
    const model = await this.ormRepository.find();
    return model;
  }

  public async findByName(name: string): Promise<Model | undefined> {
    const model = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return model;
  }

  public async findByID(id: string): Promise<Model | undefined> {
    const model = await this.ormRepository.findOne(id, {});
    return model;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      console.log(err);
      throw new AppError('Erro to delete model');
    }
  }
}
