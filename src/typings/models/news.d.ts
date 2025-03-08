export type NewsState = {
  news: Record<string, News.Docs[]>;
  meta: { hits: number } | null;
  isLoading: boolean;
  isNewsOutdated: boolean;
  error: string | null;
  lastFetch: string | null;

  currentYear: number;
  currentMonth: number;
  hasMore: boolean;
};

export namespace News {
  export type Base = {
    docs: Docs[];
    meta: {
      hits: number;
    };
  };

  export type Docs = {
    _id: string;
    abstract: string;
    web_url: string;
    multimedia: Multimedia[];
    pub_date: Date;
    news_desk: DESKS;
    source: string;
  };

  export type Multimedia = {
    type: string;
    url: string;
  };

  export enum DESKS {
    science = "SCIENCE",
    general = "GENERAL",
    entertainment = "ENTERTAINMENT",
    technology = "TECHNOLOGY",
    business = "BUSINESS",
    health = "HEALTH",
    sports = "SPORTS",
  }
}

type DateItem = { type: "date"; date: string };
type ArticleItem = { type: "article"; article: News.Docs };

export type ListItem = DateItem | ArticleItem;