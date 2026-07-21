import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSecurity } from './config/bootstrap/security.bootstrap';
import { configureValidation } from './config/bootstrap/validation.bootstrap';
import { configureSwagger } from './config/bootstrap/swagger.bootstrap';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/filters/http-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.setGlobalPrefix('api/v1');

  configureSecurity(app);
  configureValidation(app);
  configureSwagger(app);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  const config = app.get(ConfigService);
  await app.listen(config.get<number>('app.port') ?? 4000);
}

void bootstrap();
