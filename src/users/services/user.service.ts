import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './user-service.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../repositories/user-repository.interface';
import { GetUserByIdResponseDTO } from '../controllers/dtos/get-user-by-id.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

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
      name: user.username,
      email: user.email,
      birthdate: user.birthdate,
    };
  };
}
