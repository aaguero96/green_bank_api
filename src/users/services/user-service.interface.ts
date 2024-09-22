import { GetUserByIdResponseDTO } from '../controllers/dtos/get-user-by-id.dto';

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
  findById(id: string): Promise<GetUserByIdResponseDTO>;
}
