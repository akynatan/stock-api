import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface inviteUserData {
  email: string;
  company_id: string;
}

export default interface IUsersRepository {
  findByID(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  invite(data: inviteUserData): Promise<User>;
  save(user: User): Promise<User>;
}
