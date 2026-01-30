import { IsNotEmpty, IsPort, validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";

class EnvironmentVariables {
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

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config
  );

  const errors = validateSync(
    validatedConfig,
    { skipMissingProperties: false }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}