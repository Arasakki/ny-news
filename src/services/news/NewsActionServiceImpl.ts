import INewsActionService from "./INewsActionService";
import { NewsResponseDTO } from "../../typings/dto/news";
import ModelApiService from "../model/ModelApiService";
import { News } from "../../typings/models/news";
import { NYTIMES_API } from "../../configs/locales/api";

export default class NewsActionServiceImpl
  extends ModelApiService
  implements INewsActionService
{
  public async getNews(month: number, year: number): Promise<News.Base> {
    const proxyUrl = "https://corsproxy.io/?url=";
    const apiUrl = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${NYTIMES_API}`;
    const dto: NewsResponseDTO = await this.get<NewsResponseDTO>(
      `${proxyUrl}${apiUrl}`
    );
    console.log(dto, "dto");
    const base: News.Base = {
      docs: dto.docs.map((doc) => ({
        _id: doc._id,
        abstract: doc.abstract,
        web_url: doc.web_url,
        multimedia: doc.multimedia.map((media) => ({
          type: media.type,
          url: media.url,
        })),
        pub_date: new Date(doc.pub_date),
        source: doc.source,
        news_desk: doc.news_desk,
      })),
      meta: dto.meta,
    };

    return base;
  }
}
