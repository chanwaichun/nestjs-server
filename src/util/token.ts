import { sign, verify } from 'jsonwebtoken';
import { SECRET_KEY, EXPIRES_IN } from './constant';

export async function decodeToken(results: string) {
  try {
    console.log(results);
    const res = await verify(results.replace('Bearer ', ''), SECRET_KEY);
    return res;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

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
