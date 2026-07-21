import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config';
import { envValidationSchema } from './config/env.validation';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema: envValidationSchema,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
