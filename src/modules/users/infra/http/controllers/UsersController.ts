import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import InviteUserService from '@modules/users/services/InviteUserService';
import AcceptInviteUserService from '@modules/users/services/AcceptEnviteUserService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllUsers = container.resolve(ListAllUsersService);

    const users = await listAllUsers.execute();

    return response.json(classToClass(users));
  }

  public async invite(request: Request, response: Response): Promise<Response> {
    const { email, company_id } = request.body;

    const inviteUser = container.resolve(InviteUserService);

    const user = await inviteUser.execute({
      email,
      company_id,
    });

    return response.json(classToClass(user));
  }

  public async acceptInvite(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token, name, password } = request.body;

    const acceptInviteUser = container.resolve(AcceptInviteUserService);

    const user = await acceptInviteUser.execute({
      token,
      name,
      password,
    });

    return response.json(classToClass(user));
  }

  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
