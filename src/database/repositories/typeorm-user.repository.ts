import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../../user/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private readonly repository: Repository<User>) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }

  async updateAll(user: Partial<User>): Promise<UpdateResult> {
    return await this.repository.updateAll(user);
  }

  async save(user: Partial<User>): Promise<User> {
    return await this.repository.save(user);
  }

  async deleteAll(): Promise<DeleteResult> {
    return await this.repository.deleteAll();
  }
}
