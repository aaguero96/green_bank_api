import { GetUserByIdResponseDTO } from '../controllers/dtos/get-user-by-id.dto';
import { SignUpRequestDTO } from '../controllers/dtos/sigup.dto';

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
  findById(id: string): Promise<GetUserByIdResponseDTO>;
  signUp(request: SignUpRequestDTO): Promise<void>;
}
