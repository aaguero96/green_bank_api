import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user-repository.interface';
import { Repository } from 'typeorm';
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
}
