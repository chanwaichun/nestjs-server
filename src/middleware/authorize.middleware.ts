import { NextFunction, Request, Response } from 'express';
import UnauthorizedException from '../exception/unauthorizedException.ts';
import { WHITE_LIST } from '../util/constant';

export const authorizeMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req);
  if (WHITE_LIST.includes(req.path)) {
    next();
    return;
  }
  console.log(req, res);
  if (!req.headers.authorization) {
    throw new UnauthorizedException();
  }
  next();
};
