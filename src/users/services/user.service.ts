import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './user-service.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../repositories/user-repository.interface';
import { GetUserByIdResponseDTO } from '../controllers/dtos/get-user-by-id.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { SignUpRequestDTO } from '../controllers/dtos/sigup.dto';
import { UserEntity } from '../entitities/user.entity';
import { DeepPartial } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private _userRepository: IUserRepository,
  ) {}

  findById = async (id: string): Promise<GetUserByIdResponseDTO> => {
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'user not found',
      });
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
    };
  };

  signUp = async (request: SignUpRequestDTO): Promise<void> => {
    const userExists = await this._userRepository.userExists(
      request.email,
      request.username,
    );
    if (userExists) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'user alread exists',
      });
    }

    const user: DeepPartial<UserEntity> = {
      username: request.username,
      birthdate: request.birthdate,
      password: request.password,
      email: request.email,
    };

    const age = moment().diff(moment(request.birthdate, 'YYYY-MM-DD'), 'years');
    if (age < 18) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'user should is legal age',
      });
    }

    await this._userRepository.create(user);
  };
}
