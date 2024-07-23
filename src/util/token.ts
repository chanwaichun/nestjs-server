import { sign, verify } from 'jsonwebtoken';
import { SECRET_KEY, EXPIRES_IN } from './constant';
import { UnauthorizedException } from '../exception/apiException';

//解密token
export async function decodeToken(results: string) {
  try {
    return await verify(results.replace('Bearer ', ''), SECRET_KEY);
  } catch (e) {
    if (new Date(e.expiredAt).getTime() < new Date().getTime()) {
      throw new UnauthorizedException();
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
