export default class FetchError<T = Record<string, any>> extends Error {
  public code: number;
  public data?: T;
  public details?: Record<string, string>;

  constructor(
    message: string,
    code: number,
    data?: T,
    details?: Record<string, string>
  ) {
    super(code + ": " + message);
    this.code = code;
    this.data = data;
    this.details = details;
  }
}
