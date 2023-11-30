import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { writeJson } from './util';
import { Response } from 'express';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/common')
  getHello(@Res() res: Response): any {
    writeJson(res, 200, { data: null });
  }
}
