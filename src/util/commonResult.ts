export class CommonResult<T> {
  private code: number;
  private msg: string;
  private data: T;

  constructor(code: number, msg: string, data: T) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  public static success(data?): CommonResult<any>;

  public static success(msg?: string, data?): CommonResult<any>;
  public static success(msg?: any, data?: any): CommonResult<any> {

    if (arguments.length === 1) {
      return new CommonResult(200, '操作成功', arguments[0] || null);
    } else {
      return new CommonResult(200, arguments[0] || '操作成功', arguments[1] || null);
    }

  }

  public static failed(msg?: string, code?: number): CommonResult<any> {
    return new CommonResult(code || 500, msg || '未知异常', null);
  }
}
