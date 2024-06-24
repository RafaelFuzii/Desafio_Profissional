import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { LoggerModule } from './logger/logger.module';



@Module({
  imports: [CoursesModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/desafio-pro'), UsersModule, AuthModule, CharacterModule, LoggerModule],
  controllers: [AppController],
  providers: 
  [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
