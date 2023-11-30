import { Response } from 'express';
import type { HttpStatus } from '@nestjs/common';

type commonResult = {
  code?: HttpStatus;
  msg?: string | null;
  data?: any;
};

export function writeJson(
  res: Response,
  status: HttpStatus,
  data: commonResult,
) {
  const defaultResult = {
    code: status,
    msg: null,
    data: null,
    ...data,
  };
  res.status(status);
  res.json(defaultResult);
}
