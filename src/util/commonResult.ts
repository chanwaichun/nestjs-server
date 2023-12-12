export class CommonResult<T> {
  private code: number;
  private msg: string;
  private data: T;

  constructor(code: number, msg: string, data: T) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  public static success(msg?: string, data?): CommonResult<any> {
    return new CommonResult(200, msg || '操作成功', data || null);
  }

  public static failed(msg?: string, code?): CommonResult<any> {
    return new CommonResult(code || 500, msg || '未知异常', null);
  }
}
