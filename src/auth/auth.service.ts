import { 
  ConflictException, 
  Injectable, 
  UnauthorizedException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return await this.usersRepository.save({ email, salt, hash });
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
