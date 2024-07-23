import { HttpException, HttpStatus } from '@nestjs/common';

export class FailException extends HttpException {
  constructor(response?: string) {
    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super('登录已过期', HttpStatus.UNAUTHORIZED);
  }
}
