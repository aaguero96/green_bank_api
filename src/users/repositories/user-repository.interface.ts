import { UserEntity } from '../entitities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findById(id: string): Promise<UserEntity>;
}
