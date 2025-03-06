export const sortNewsByDate = (news: Array<{ pub_date: string }>) => {
  return news.sort(
    (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
  );
};
