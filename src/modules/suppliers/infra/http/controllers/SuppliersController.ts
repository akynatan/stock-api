import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierService from '@modules/suppliers/services/CreateSupplierService';
import ListAllSuppliersService from '@modules/suppliers/services/ListAllSuppliersService';
import DetailSupplierService from '@modules/suppliers/services/DetailSupplierService';
import DeleteSupplierService from '@modules/suppliers/services/DeleteSupplierService';
import ListProductsSupplierService from '@modules/suppliers/services/ListProductsSupplierService';
import UpdateSupplierService from '@modules/suppliers/services/UpdateSupplierService';
import { classToClass } from 'class-transformer';

export default class SuppliersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name_social_reason,
      name_fantasy,
      cnpj,
      tel,
      tel2,
      domain,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      representative_name,
      mail,
      mail2,
      logo,
      note,
    } = request.body;

    const createSupplier = container.resolve(CreateSupplierService);

    const supplier = await createSupplier.execute({
      name_social_reason,
      name_fantasy,
      cnpj,
      tel,
      tel2,
      domain,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      representative_name,
      mail,
      mail2,
      logo,
      note,
    });

    return response.json(classToClass(supplier));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name_social_reason,
      name_fantasy,
      cnpj,
      tel,
      tel2,
      domain,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      representative_name,
      mail,
      mail2,
      logo,
      note,
    } = request.body;
    const supplier_id = request.params.id;

    const updateSupplier = container.resolve(UpdateSupplierService);

    const supplier = await updateSupplier.execute({
      supplier_id,
      name_social_reason,
      name_fantasy,
      cnpj,
      tel,
      tel2,
      domain,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      representative_name,
      mail,
      mail2,
      logo,
      note,
    });

    return response.json(classToClass(supplier));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllSuppliersService = container.resolve(ListAllSuppliersService);

    const suppliers = await listAllSuppliersService.execute();

    return response.json(classToClass(suppliers));
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const supplier_id = request.params.id;

    const detailSupplier = container.resolve(DetailSupplierService);

    const supplier = await detailSupplier.execute({
      supplier_id,
    });

    return response.json(classToClass(supplier));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const supplier_id = request.params.id;

    const deleteSupplier = container.resolve(DeleteSupplierService);

    const supplier = await deleteSupplier.execute({
      supplier_id,
    });

    return response.json(classToClass(supplier));
  }

  public async listProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { supplier_id } = request.query;

    const listProductsSupplier = container.resolve(ListProductsSupplierService);

    const products = await listProductsSupplier.execute({
      supplier_id: String(supplier_id),
    });

    return response.json(products);
  }
}
