import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDTO): Promise<any> {
    const { email, password } = dto;
    return await this.authService.signUp(email, password);
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDTO): Promise<any> {
    const { email, password } = dto;
    return await this.authService.signIn(email, password);
  }
}
