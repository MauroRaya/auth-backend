import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { TypeOrmUserRepository } from 'src/database/repositories/typeorm-user.repository';
import { UserConsumer } from './user.consumer';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({ name: 'user' }),
  ],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (repository: Repository<User>) => {
        return new TypeOrmUserRepository(repository);
      },
      inject: [getRepositoryToken(User)],
    },
    UserConsumer,
    UserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
