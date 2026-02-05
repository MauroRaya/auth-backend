import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './config/swagger.config';
import { EnvService } from './env/env.service';
import { Environment } from './env/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  const envService = app.get(EnvService);

  const nodeEnv = envService.get<Environment>('NODE_ENV');
  if (nodeEnv === 'development') configureSwagger(app);

  const port = envService.get<number>('PORT');
  await app.listen(port);
}
void bootstrap();
