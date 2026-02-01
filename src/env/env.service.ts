import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validate';

@Injectable()
export class EnvService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  get<T>(key: keyof EnvironmentVariables) {
    return this.configService.get<T>(key);
  }
}
