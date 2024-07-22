import { NextFunction, Request, Response } from 'express';
import UnauthorizedException from '../exception/unauthorizedException.ts';
import { WHITE_LIST } from '../util/constant';

export const authorizeMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    next();
    return;
  }
  // 如果是白名单就放行
  if (WHITE_LIST.includes(req.path)) {
    next();
    return;
  }
  // 如果没有token
  if (!req.headers.authorization) {
    throw new UnauthorizedException();
  }
  next();
};
