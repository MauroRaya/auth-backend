import { User } from 'src/user/user.entity';

export interface UserRepository {
  findOneByEmail(email: string): Promise<User | null>;
  updateAll(user: Partial<User>);
  save(user: Partial<User>): Promise<User>;
}
