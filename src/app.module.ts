import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validate';
import { EnvModule } from './env/env.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
    }),
    EnvModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => AppDataSource.options
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
