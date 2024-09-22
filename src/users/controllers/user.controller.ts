import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  GetUserByIdRequestDTO,
  GetUserByIdResponseDTO,
} from './dtos/get-user-by-id.dto';
import { status } from '@grpc/grpc-js';

@Controller()
export class UserController {
  @GrpcMethod('UserService', 'GetUserById')
  getUserById(request: GetUserByIdRequestDTO): GetUserByIdResponseDTO {
    const users = [
      {
        id: '7ce9dcc6-f7ae-4d5a-903f-d0b659ec3857',
        birthdate: '1990-01-01',
        email: 'user1@example.com',
        name: 'John Doe',
      },
      {
        id: '86aaac6c-37f3-4c79-82ea-2ecf18c26271',
        birthdate: '1985-05-15',
        email: 'user2@example.com',
        name: 'Jane Smith',
      },
      {
        id: '3ee54fa3-1b27-4f5c-bfc4-edd91cfac375',
        birthdate: '1992-09-10',
        email: 'user3@example.com',
        name: 'Alice Johnson',
      },
      {
        id: 'c3ac091b-80a3-442e-abcb-073f8cac0aea',
        birthdate: '2000-11-22',
        email: 'user4@example.com',
        name: 'Bob Brown',
      },
    ];

    const user = users.find((user) => user.id === request.id);

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Não encontrado',
      });
    }

    return user;
  }
}
