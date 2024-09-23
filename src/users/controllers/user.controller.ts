import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetUserByIdRequestDTO,
  GetUserByIdResponseDTO,
} from './dtos/get-user-by-id.dto';
import { IUserService, USER_SERVICE } from '../services/user-service.interface';
import { SignUpRequestDTO, SignUpResponseDTO } from './dtos/sigup.dto';
import { validateRequest } from 'src/shared/helper/validate-request.helper';

@Controller()
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private _userService: IUserService,
  ) {}

  @GrpcMethod('UserService', 'GetUserById')
  async getUserById(
    request: GetUserByIdRequestDTO,
  ): Promise<GetUserByIdResponseDTO> {
    const user = await this._userService.findById(request.id);

    return user;
  }

  @GrpcMethod('UserService', 'SignUp')
  async signUp(request: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    const req = await validateRequest(SignUpRequestDTO, request);

    await this._userService.signUp(req);

    return { message: 'user was created' };
  }
}
