import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbService } from '../db/db.service';
import { NoticeModule } from '../notice/notice.module';
import { NoticeService } from '../notice/notice.service';

@Module({
  imports: [NoticeModule],
  controllers: [UserController],
  providers: [UserService, DbService, NoticeService],
  exports: [UserService],
})
export class UserModule {
}
