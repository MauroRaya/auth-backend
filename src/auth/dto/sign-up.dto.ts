import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
