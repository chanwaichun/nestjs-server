import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(params: any): string {
    return '222222';
  }
}
