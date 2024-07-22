import { join } from 'path';

console.log(join(__dirname, '../..', 'public'));

export const secretKey: string = 'chanwaichun';
export const SECRET_KEY: string = 'chanwaichun';
export const EXPIRES_IN: string = '24d';
export const WHITE_LIST: string[] = [
  '/api/user/login',
  '/static/',
  '/favicon.ico',
];
