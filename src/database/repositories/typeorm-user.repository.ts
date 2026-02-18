import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private readonly repository: Repository<User>) {}

  async find(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }

  async save(user: Partial<User>): Promise<User> {
    return await this.repository.save(user);
  }
}
