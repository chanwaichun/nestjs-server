export class commonResult<T> {
  private code: number;
  private msg: string;
  private data: T;

  constructor(code: number, msg: string, data: T) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}
