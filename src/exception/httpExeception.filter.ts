import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { CommonResult } from '../util/commonResult';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = await ctx.getResponse();
    const req = await ctx.getRequest();
    if (!['/favicon.ico'].includes(req.originalUrl)) {
      console.log(exception);
    }
    res.status(200);
    if (exception.status === 401) {
      res.json(CommonResult.failed('登录已过期', exception.status));
      return;
    }
    const currentStatus = 500;

    if (
      Object.prototype.toString.call(exception.response) === '[object Object]'
    ) {
      const { message: [firstMsg = ''] = '' } = exception.response;
      res.json(CommonResult.failed(firstMsg, currentStatus));
      return;
    }
    res.json(CommonResult.failed(exception.response, currentStatus));
  }
}
