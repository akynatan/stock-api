import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateSupplierLogoService from '@modules/suppliers/services/UpdateSupplierLogoService';

export default class SupplierLogoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateSupplierLogo = container.resolve(UpdateSupplierLogoService);
    const supplier_id = request.params.id;

    const supplier = await updateSupplierLogo.execute({
      supplier_id,
      imageFileName: request.file.filename,
    });
    return response.json(classToClass(supplier));
  }
}
