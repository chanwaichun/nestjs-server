import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';

@Module({
  imports: [BookModule],
  controllers: [AppController],
  providers: [AppService, BookService],
})
export class AppModule {}
