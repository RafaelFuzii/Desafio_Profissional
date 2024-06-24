import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Log } from 'src/schemas/log.schema';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    return next
      .handle()
      .pipe(
        tap(() => {
          const responseTime = Date.now() - now;
          const log = new this.logModel({
            route: url,
            method: method,
            responseTime: `${responseTime}ms`,
          });
          log.save();
        })
      );
  }
}
