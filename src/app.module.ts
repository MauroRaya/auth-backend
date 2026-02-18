import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validate';
import { EnvModule } from './env/env.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bullmq';
import { EnvService } from './env/env.service';

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
    BullModule.forRootAsync({
      useFactory: (envService: EnvService) => {
        return {
          connection: {
            host: envService.get<string>('REDIS_HOST'),
            port: envService.get<number>('REDIS_PORT'),
          },
        };
      },
      inject: [EnvService],
    }),
    UserModule,
  ],
})
export class AppModule {}
