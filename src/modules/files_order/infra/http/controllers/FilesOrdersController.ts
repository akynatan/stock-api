import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFilesOrdersService from '@modules/files_order/services/CreateFilesOrdersService';
import DeleteFilesOrderService from '@modules/files_order/services/DeleteFilesOrderService';
import ListFilesFromOrderService from '@modules/files_order/services/ListFilesFromOrderService';

export default class FilesOrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.body;
    const { originalname, filename } = request.file;

    const createFilesOrders = container.resolve(CreateFilesOrdersService);

    const file_order = await createFilesOrders.execute({
      order_id,
      fileName: filename,
      originalname,
    });

    const file_order_returned = classToClass(file_order);

    return response.json(file_order_returned);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteFilesOrder = container.resolve(DeleteFilesOrderService);

    await deleteFilesOrder.execute({
      id: String(id),
    });

    return response.json({});
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.query;

    const listFilesFromOrder = container.resolve(ListFilesFromOrderService);

    const files_order = await listFilesFromOrder.execute({
      order_id: String(order_id),
    });

    const files_order_response = classToClass(files_order);

    return response.json(files_order_response);
  }
}
