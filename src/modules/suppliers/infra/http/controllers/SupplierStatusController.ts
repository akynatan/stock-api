import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ToggleStatusSupplierService from '@modules/suppliers/services/ToggleStatusSupplierService';

export default class SupplierStatusController {
  public async update(request: Request, response: Response): Promise<Response> {
    const toggleStatusSupplier = container.resolve(ToggleStatusSupplierService);
    const supplier_id = request.params.id;

    const supplier = await toggleStatusSupplier.execute({
      supplier_id,
    });

    return response.json(classToClass(supplier));
  }
}
