import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => AppDataSource.options
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
