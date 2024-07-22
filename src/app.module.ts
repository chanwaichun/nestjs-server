import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { expressjwt } from 'express-jwt';
import { SECRET_KEY, WHITE_LIST } from './util/constant';
import { testMiddleware } from './middleware/test.middleware';
import { authorizeMiddleware } from './middleware/authorize.middleware';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception/http-exeception.filter';
import { DbModule } from './db/db.module';
import { Request } from 'express';
@Module({
  imports: [UserModule, DbModule],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    try {
      consumer
        .apply(
          expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({
            custom: (req: Request) => {
              console.log(req.path);
              return (
                process.env.NODE_ENV === 'development' ||
                WHITE_LIST.includes(req.path)
              );
            },
          }),
          authorizeMiddleware,
          testMiddleware,
        )
        .forRoutes({
          path: '*',
          method: RequestMethod.ALL,
        });
    } catch (e) {
      console.log(e, 111111111);
    }
  }
}
