import { Processor, WorkerHost } from '@nestjs/bullmq';
import { UserService } from './user.service';
import { Job } from 'bullmq';

@Processor('user')
export class UserConsumer extends WorkerHost {
  constructor(private readonly usersService: UserService) {
    super();
  }

  async process(job: Job, token?: string) {
    if (job.name === 'deactivate-users') await this.deactivateUsers();
  }

  async deactivateUsers() {
    await this.usersService.deactivateUsers();
  }
}
