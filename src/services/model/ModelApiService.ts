import FetchError from "../../utils/erorrs/FetchError";
import IHttpService from "../http/IHttpService";
import ILanguageService from "../language/ILanguageService";
import IModelApiService from "./IModelApiService";
export default class ModelApiService implements IModelApiService {
  constructor(
    private httpService: IHttpService,
    private languageService: ILanguageService
  ) {}

  public static readonly getDefaultHeaders = () => ({
    "Content-Type": "application/json",
  });

  public get = <T>(url: string, options?: RequestInit): Promise<T> => {
    console.debug("[Fetch]: GET", url);

    return this.httpService
      .fetch(url, options)
      .then(this.parseResponse)
      .then(this.parseResponsePayload);
  };

  private parseResponse = async (res: Response) => {
    if (res.status === 204) {
      return;
    }
    let details;
    try {
      const contentType = res.headers.get("Content-Type");
      if (contentType?.includes("json")) {
        const jsonResponse = await res.json();
        if (res.ok) return jsonResponse;
        else {
          details = jsonResponse.error.details;
          throw new Error(jsonResponse.error?.message || jsonResponse.message);
        }
      } else if (!res.ok) {
        throw new Error();
      }
    } catch (error: Error | any) {
      console.error("[Fetch] Error: " + error?.message);
      throw this.getError(res.status, error?.message, details);
    }
  };

  private parseResponsePayload = (response: any) => {
    return response.response;
  };

  private getError = (
    code: number,
    message?: string,
    details?: Record<string, string>
  ): FetchError => {
    switch (code) {
      case 404:
        if (!message)
          message = this.languageService.translate(`errors.code.${code}`);
        break;
      default:
        if (!message) message = "Request failed";
    }
    return new FetchError(message, code, details);
  };
}
