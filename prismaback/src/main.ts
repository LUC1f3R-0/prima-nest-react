import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsConfig } from './common/cors/cors.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsConfig = app.get(CorsConfig);
  const configService = app.get(ConfigService);

  app.enableCors(corsConfig.options);
  app.setGlobalPrefix('api/v1');

  await app.listen(configService.get<number>('app.port') ?? 3000, '0.0.0.0');
}
bootstrap();
