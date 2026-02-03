import { IsNotEmpty, IsPort } from 'class-validator';

export class EnvironmentVariables {
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsPort()
  POSTGRES_PORT: number;

  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsNotEmpty()
  POSTGRES_DB: string;

  @IsPort()
  PORT: number;
}
