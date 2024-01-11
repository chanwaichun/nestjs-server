import { HttpException, HttpStatus } from '@nestjs/common';

export default class UnauthorizedException extends HttpException {
  constructor(response?: string) {
    super('登录已过期', HttpStatus.UNAUTHORIZED);
  }
}
