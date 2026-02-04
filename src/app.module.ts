import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validate';
import { EnvModule } from './env/env.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    EnvModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => AppDataSource.options,
    }),
    AuthModule,
  ],
})
export class AppModule {}
