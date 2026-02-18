import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (user) {
      throw new ConflictException('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return await this.usersRepository.save({ email, salt, hash });
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
