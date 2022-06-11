import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/client/services/CreateClientService';
import ListAllClientsService from '@modules/client/services/ListAllClientsService';
import DetailClientService from '@modules/client/services/DetailClientService';
import DeleteClientService from '@modules/client/services/DeleteClientService';
import UpdateClientService from '@modules/client/services/UpdateClientService';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      document,
      tel,
      tel2,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      mail,
      note,
    } = request.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      name,
      document,
      tel,
      tel2,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      mail,
      note,
    });

    return response.json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      document,
      tel,
      tel2,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      mail,
      note,
    } = request.body;
    const client_id = request.params.id;

    const updateClient = container.resolve(UpdateClientService);

    const client = await updateClient.execute({
      client_id,
      name,
      document,
      tel,
      tel2,
      city_id,
      neighborhood,
      street,
      cep,
      number,
      complement,
      mail,
      note,
    });

    return response.json(client);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllClientsService = container.resolve(ListAllClientsService);

    const clients = await listAllClientsService.execute();

    return response.json(clients);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const client_id = request.params.id;

    const detailClient = container.resolve(DetailClientService);

    const client = await detailClient.execute({
      client_id,
    });

    return response.json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const client_id = request.params.id;

    const deleteClient = container.resolve(DeleteClientService);

    const client = await deleteClient.execute({
      client_id,
    });

    return response.json(client);
  }
}
