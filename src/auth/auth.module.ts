import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { EnvService } from 'src/env/env.service';
import { AuthController } from './auth.controller';
import { Repository } from 'typeorm';
import { TypeOrmUserRepository } from 'src/database/repositories/typeorm-user.repository';
import { AuthService } from './auth.service';

export const USER_REPOSITORY = 'USER_REPOSITORY';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        secret: envService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useFactory: (repository: Repository<User>) => {
        return new TypeOrmUserRepository(repository);
      },
      inject: [getRepositoryToken(User)],
    },
    AuthService,
  ],
})
export class AuthModule {}
