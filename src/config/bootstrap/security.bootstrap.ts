import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';

export function configureSecurity(app: INestApplication): void {
  app.use(helmet());

  app.use(compression());

  app.enableCors({
    origin: true,
    credentials: true,
  });
}