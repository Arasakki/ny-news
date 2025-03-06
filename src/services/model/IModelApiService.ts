export default interface IModelApiService {
  get<T>(url: string): Promise<T>;
}
