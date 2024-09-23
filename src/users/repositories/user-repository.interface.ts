import { DeepPartial } from 'typeorm';
import { UserEntity } from '../entitities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findById(id: string): Promise<UserEntity>;
  create(user: DeepPartial<UserEntity>): Promise<void>;
  userExists(email: string, username: string): Promise<boolean>;
}
