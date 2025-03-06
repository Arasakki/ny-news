type NewsState = {
  news: News[];
  isLoading: boolean;
  isNewsOutdated: boolean;
  error: Error | null;
};

namespace News {
  type Base = {
    docs: Docs[];
    meta: {
      hits: number;
    };
  };

  type Docs = Entity & {
    abstract: string;
    web_url: string;
    multimedia: Multimedia[];
    pub_date: Date;
    source: string;
  };

  type Multimedia = {
    type: string;
    url: string;
  };
}
