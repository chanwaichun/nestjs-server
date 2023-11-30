import { sign, verify } from 'jsonwebtoken';
import { secretKey } from './constant';

export function decodeToken(results) {
  try {
    return verify(results.replace('Bearer ', ''), secretKey);
  } catch (e) {
    throw new Error(e);
  }
}

export function encodeToken(results) {
  try {
    return sign(results, secretKey, {
      expiresIn: '10s',
      algorithm: 'HS256',
    });
  } catch (e) {
    throw new Error(e);
  }
}
