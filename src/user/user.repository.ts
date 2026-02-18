import { User } from 'src/user/user.entity';

export interface UserRepository {
  find(): Promise<User[]>;
  findOneByEmail(email: string): Promise<User | null>;
  save(user: Partial<User>): Promise<User>;
}
