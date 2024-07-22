import { sign, verify } from 'jsonwebtoken';
import { SECRET_KEY, EXPIRES_IN } from './constant';
import { HttpException, HttpStatus } from '@nestjs/common';

//解密token
export async function decodeToken(results: string) {
  try {
    const res = await verify(results.replace('Bearer ', ''), SECRET_KEY);
    return res;
  } catch (e) {
    console.log(e);
    if (new Date(e.expiredAt).getTime() < new Date().getTime()) {
      throw new HttpException('验证已过期', HttpStatus.UNAUTHORIZED);
    }
    throw new Error(e);
  }
}
// 加密token
export function encodeToken(results) {
  try {
    return sign(results, SECRET_KEY, {
      expiresIn: EXPIRES_IN,
      algorithm: 'HS256',
    });
  } catch (e) {
    throw new Error(e);
  }
}
