import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class SignUpRequestDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
    minLowercase: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDateString({ strict: true })
  birthdate: string;
}

export class SignUpResponseDTO {
  message: string;
}
