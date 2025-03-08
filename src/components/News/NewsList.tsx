import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../storage";
import { fetchCurrentMonth, fetchOlderMonth } from "../../storage/slices/news";
import Loader from "../loader";
import {
  VariableSizeList as List,
  ListChildComponentProps,
} from "react-window";
import NewsArticle from "./NewsArticle";
import { News } from "../../typings/models/news";
import { Box } from "@mui/material";
import getItemSize from "../../utils/newsItemSize";

type ListItem =
  | { type: "date"; date: string }
  | { type: "article"; article: News.Docs };

export default function NewsList() {
  const dispatch: AppDispatch = useDispatch();
  const { news, hasMore, isLoading } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("new news");
      dispatch(fetchCurrentMonth());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCurrentMonth());
  }, [dispatch]);

  // Преобразование новостей в плоский список
  const flatList: ListItem[] = Object.entries(news).reduce<ListItem[]>(
    (acc, [date, articles]: [string, News.Docs[]]) => [
      ...acc,
      { type: "date" as const, date },
      ...articles.map((article) => ({ type: "article" as const, article })),
    ],
    []
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastNewsElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchOlderMonth());
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, dispatch]
  );

  const renderItem = (props: ListChildComponentProps) => {
    const { index, style } = props;
    const item = flatList[index];
    const isLast = index === flatList.length - 1;

    return (
      <NewsArticle
        key={index}
        item={item}
        isLast={isLast}
        lastNewsElementRef={lastNewsElementRef}
        style={style}
      />
    );
  };

  const itemSize = useCallback(
    (index: number) => getItemSize(index, flatList),
    [flatList]
  );

  return (
    <Box sx={{ paddingX: "20px" }}>
      <List
        itemCount={flatList.length}
        itemSize={itemSize}
        height={window.innerHeight - 60}
        width="100%"
        overscanCount={3}
      >
        {renderItem}
      </List>
      {isLoading && <Loader />}
    </Box>
  );
}
