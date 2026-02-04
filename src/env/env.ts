import { IsIn, IsNotEmpty, IsPort } from 'class-validator';

export const environments = ['development', 'production'] as const;
export type Environment = (typeof environments)[number];

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsIn(environments)
  NODE_ENV: Environment;

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
