import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from './user.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: UserRepository,

    @InjectQueue('user')
    private readonly userQueue: Queue,
  ) {}

  async deactivateUsers() {
    await this.usersRepository.updateAll({ isActive: false });
  }

  async queueDeactivateUsers() {
    await this.userQueue.add('deactivate-users', {});
  }
}
