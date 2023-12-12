import { HttpException, HttpStatus } from '@nestjs/common';

export default class ApiException extends HttpException {
  constructor(response?: string) {
    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
