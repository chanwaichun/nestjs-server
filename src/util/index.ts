import { Response } from 'express';
import SnowflakeId from 'snowflake-id';
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
  res.send(defaultResult);
}
export const snowflake = new SnowflakeId({
  mid: 100,
  offset: (2023 - 1970) * 31536000 * 1000,
});
