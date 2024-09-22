export class GetUserByIdRequestDTO {
  id: string;
}

export class GetUserByIdResponseDTO {
  id: string;
  name: string;
  email: string;
  birthdate: string;
}
