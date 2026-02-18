import { Controller, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Put('deactivate')
  async updateUsersToInactive() {
    await this.usersService.queueDeactivateUsers();
  }
}
