import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env/env';
import { EnvService } from 'src/env/env.service';
import { config } from 'dotenv';
import { User } from 'src/user/user.entity';
import path from 'path';
config();

const configService = new ConfigService<EnvironmentVariables, true>();
const envService = new EnvService(configService);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envService.get<string>('POSTGRES_HOST'),
  port: envService.get<number>('POSTGRES_PORT'),
  username: envService.get<string>('POSTGRES_USER'),
  password: envService.get<string>('POSTGRES_PASSWORD'),
  database: envService.get<string>('POSTGRES_DB'),
  synchronize: false,
  entities: [User],
  migrations: [
    path.join(__dirname, '/../database/migrations/*-migration.{ts,js}'),
  ],
  migrationsRun: false,
  logging: true,
});
