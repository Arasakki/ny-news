import { News } from "../models/news";

export type NewsResponseDTO = EntityDTOResponse & {
  meta: {
    hits: number;
  };
  docs: Array<{
    _id: string;
    web_url: string;
    abstract: string;
    pub_date: string;
    news_desk: News.DESKS;
    source: string;
    multimedia: Array<{ url: string; type: string }>;
  }>;
};
