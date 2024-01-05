import { Request, Response, NextFunction } from 'express';

export const testMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.statusCode, '222222');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Keep-Alive', 'timeout=60,max=1000');
  res.header('Connection', 'keep-alive');
  next();
};
