import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user-repository.interface';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entitities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
  ) {}

  findById = async (id: string): Promise<UserEntity> => {
    return this._userRepository.findOne({ where: { id } });
  };

  create = async (user: DeepPartial<UserEntity>): Promise<void> => {
    await this._userRepository.save(user);
  };

  userExists = async (email: string, username: string): Promise<boolean> => {
    const emailExists = this._userRepository.exists({ where: { email } });
    const usernameExists = this._userRepository.exists({ where: { username } });
    return emailExists || usernameExists;
  };
}
