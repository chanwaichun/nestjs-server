export class CommonResult<T> {
  private code: number;
  private msg: string;
  private data: T;

  constructor(code: number, msg: string, data: T) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  public static success<T>(): CommonResult<T>;
  public static success<T>(data?: T): CommonResult<T>;
  public static success<T>(msg?: string, data?: T): CommonResult<T>;
  public static success<T>(msg?: any, data?: any): CommonResult<T> {
    if (arguments.length === 0) {
      return new CommonResult<T>(200, '操作成功', null);
    }
    if (arguments.length === 1) {
      // eslint-disable-next-line prefer-rest-params
      return new CommonResult<T>(200, '操作成功', arguments[0] || null);
    }
    if (arguments.length === 2) {
      // eslint-disable-next-line prefer-rest-params
      return new CommonResult<T>(200, msg || '操作成功', data || null);
    }
  }

  public static failed<T>(): CommonResult<T>;
  public static failed<T>(msg?: string, code?: number): CommonResult<T>;
  public static failed<T>(msg?: any, code?: any): CommonResult<T> {
    if (arguments.length === 0) {
      return new CommonResult<T>(500, '未知异常', null);
    }
    return new CommonResult<T>(code || 500, msg || '未知异常', null);
  }
}
