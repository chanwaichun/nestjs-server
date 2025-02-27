import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { expressjwt } from 'express-jwt';
import { SECRET_KEY, WHITE_LIST } from './util/constant';
import { commonMiddleware } from './middleware/common.middleware';
import { authorizeMiddleware } from './middleware/authorize.middleware';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception/httpExeception.filter';
import { DbModule } from './db/db.module';
import { Request } from 'express';
import { SubjectModule } from './subject/subject.module';
import { NoticeModule } from './notice/notice.module';
import { NoticeService } from './notice/notice.service';
import { ThirdPartyModule } from './thirdParty/thirdParty.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    NoticeModule,
    UserModule,
    DbModule,
    SubjectModule,
    ThirdPartyModule,
    ConfigModule.forRoot({
      envFilePath: path.resolve(`env/.env.${process.env.NODE_ENV}`),
      isGlobal: true, // 使得环境变量在整个应用中都可以访问
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    NoticeService,
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
              return (
                process.env.NODE_ENV === 'development' ||
                WHITE_LIST.includes(req.path)
              );
            },
          }),
          authorizeMiddleware,
          commonMiddleware,
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
