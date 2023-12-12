import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CommonResult } from '../util/commonResult';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    console.log(exception);
    res.json(CommonResult.failed(exception.response, exception.status));
  }
}
