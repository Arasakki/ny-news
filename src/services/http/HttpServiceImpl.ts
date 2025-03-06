import FetchError from "../../utils/erorrs/FetchError";
import IHttpService from "./IHttpService";

export default class HttpServiceImpl implements IHttpService {
  private readonly service = window.fetch.bind(window);

  public fetch: typeof fetch = (url, params) => {
    return this.service(url, params);
  };

  public parseResponseJson = async <T extends any = void>(
    res: Response
  ): Promise<T> => {
    if (res.status === 204) {
      return undefined as T;
    }

    let jsonResponse = undefined as T;
    try {
      const contentType = res.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        jsonResponse = await res.json();
        if (res.ok) return jsonResponse;
        else
          throw new Error((jsonResponse as Record<string, any>)?.error.message);
      } else if (!res.ok) {
        throw new Error();
      } else {
        return undefined as T;
      }
    } catch (e: any) {
      const errorMessage = e?.message;
      console.error("[Fetch] Error: " + errorMessage);
      throw new FetchError(errorMessage, res.status, jsonResponse);
    }
  };

  public parseResponseBlob = async (res: Response): Promise<Blob> => {
    let details;
    try {
      // Если res.ok то получаем blob
      if (res.ok) {
        const blob = await res.blob();
        return blob;
      } else {
        const contentType = res.headers.get("Content-Type");
        if (contentType?.includes("json")) {
          const jsonResponse = await res.json();
          details = jsonResponse.error.details;
          throw new Error((jsonResponse as Record<string, any>)?.error.message);
        } else {
          throw new Error();
        }
      }
    } catch (e: any) {
      const errorMessage = e?.message;
      console.error("[Fetch] Error: " + errorMessage);
      throw new FetchError(errorMessage, res.status, details);
    }
  };
}
