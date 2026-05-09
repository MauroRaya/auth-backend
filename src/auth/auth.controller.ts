import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(201)
  signUp(@Body() dto: SignUpDTO) {
    const { email, password } = dto;
    return this.authService.signUp(email, password);
  }

  @Post('sign-in')
  @HttpCode(200)
  signIn(@Body() dto: SignInDTO) {
    const { email, password } = dto;
    return this.authService.signIn(email, password);
  }
}
