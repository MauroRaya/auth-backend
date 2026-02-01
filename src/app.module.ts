import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validate';
import { EnvModule } from './env/env.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    EnvModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => AppDataSource.options,
    }),
    HealthModule,
    AuthModule,
  ],
})
export class AppModule {}
