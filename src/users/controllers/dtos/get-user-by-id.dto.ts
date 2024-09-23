export class GetUserByIdRequestDTO {
  id: string;
}

export class GetUserByIdResponseDTO {
  id: string;
  username: string;
  email: string;
  birthdate: string;
}
