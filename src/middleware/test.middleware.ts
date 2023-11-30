import { Request, Response, NextFunction } from 'express';

export const testMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.statusCode, '222222');
  next();
};
