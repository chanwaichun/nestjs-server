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
    console.log(exception);
    const currentStatus = exception.status || 500;
    res.status(currentStatus);
    if (currentStatus === 401) {
      res.json(CommonResult.failed('登录已过期', currentStatus));
      return;
    }
    if (
      Object.prototype.toString.call(exception.response) ===
        '[object Object]' &&
      currentStatus === HttpStatus.BAD_REQUEST
    ) {
      const { message: [firstMsg = ''] = '' } = exception.response;
      res.json(CommonResult.failed(firstMsg, currentStatus));
      return;
    }
    res.json(CommonResult.failed(exception.response, currentStatus));
  }
}
