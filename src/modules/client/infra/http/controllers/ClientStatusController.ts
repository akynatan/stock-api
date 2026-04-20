import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ToggleStatusClientService from '@modules/client/services/ToggleStatusClientService';

export default class ClientStatusController {
  public async update(request: Request, response: Response): Promise<Response> {
    const toggleStatusClient = container.resolve(ToggleStatusClientService);
    const client_id = request.params.id;

    const client = await toggleStatusClient.execute({
      client_id,
    });

    return response.json(classToClass(client));
  }
}
