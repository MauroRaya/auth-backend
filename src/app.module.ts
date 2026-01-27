import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './env/env.validate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get<string>('POSTGRES_HOST'),
        port: ConfigService.get<number>('POSTGRES_PORT'),
        username: ConfigService.get<string>('POSTGRES_USER'),
        password: ConfigService.get<string>('POSTGRES_PASSWORD'),
        database: ConfigService.get<string>('POSTGRES_DB'),
        entities: [User],
        synchronize: false,
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
