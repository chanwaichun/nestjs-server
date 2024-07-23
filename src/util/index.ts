import { Response } from 'express';
import SnowflakeId from 'snowflake-id';
import type { HttpStatus } from '@nestjs/common';
import base62 from 'base62-ts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

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
export const getSnowflakeId = () => {
  const id = snowflake.generate();
  return base62.encode(id);
};
export const getTime = () => {
  return moment().format('yyyy-MM-DD HH:mm:ss');
};
