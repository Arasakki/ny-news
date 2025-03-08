import { News } from "../../typings/models/news";

export default interface INewsActionService {
  getNews(month: number, year: number): Promise<News.Base>;
}
