import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import ListAllCompanyService from '@modules/company/services/ListAllCompanyService';

export default class CompanysController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      name,
    });

    return response.json(classToClass(company));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllCompany = container.resolve(ListAllCompanyService);

    const companys = await listAllCompany.execute();

    return response.json(companys);
  }
}
