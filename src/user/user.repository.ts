import { User } from 'src/user/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface UserRepository {
  findOneByEmail(email: string): Promise<User | null>;
  updateAll(user: Partial<User>): Promise<UpdateResult>;
  save(user: Partial<User>): Promise<User>;
  deleteAll(): Promise<DeleteResult>;
}
