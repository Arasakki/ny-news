export default interface IHttpService {
    fetch: typeof fetch;
    parseResponseJson: <T = any>(res: Response) => Promise<T>;
    parseResponseBlob: (res: Response) => Promise<Blob>;
  }
  