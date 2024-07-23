import { NextFunction, Request, Response } from 'express';

export const commonMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(200);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Keep-Alive', 'timeout=60,max=1000');
  res.header('Connection', 'keep-alive');
  next();
};
