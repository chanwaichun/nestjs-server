import { sign, verify } from 'jsonwebtoken';
import { EXPIRES_IN, SECRET_KEY } from './constant';
import {
  FailException,
  UnauthorizedException,
} from '../exception/apiException';

//解密token
export async function decodeToken(results: string) {
  try {
    return await verify(results.replace('Bearer ', ''), SECRET_KEY);
  } catch (e) {
    if (new Date(e.expiredAt).getTime() < new Date().getTime()) {
      throw new UnauthorizedException();
    }
    console.log(e);
    throw new FailException('jwt解析出错');
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
    console.log(e);
    throw new FailException('jwt加密出错');
  }
}
