import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { CommonResult } from '../util/commonResult';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = await ctx.getResponse();
    console.log(exception.response);
    res.status(exception.status || 500);
    if (
      Object.prototype.toString.call(exception.response) ===
        '[object Object]' &&
      exception.status === HttpStatus.BAD_REQUEST
    ) {
      const { message: [firstMsg = ''] = '' } = exception.response;
      res.json(CommonResult.failed(firstMsg, exception.status));
      return;
    }
    res.json(CommonResult.failed(exception.response, exception.status));
  }
}
