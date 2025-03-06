// // features/news/newsSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { sortNewsByDate } from "../../utils/dateUtils";
// import { fetchNewsApi } from "../../services/newsApi";
// import defaultState from "../defaultState";

// const initialState: NewsState = {
//   ...defaultState,
//   news: [],
//   isNewsOutdated: false,
// };

// // Асинхронный thunk для загрузки новостей по году и месяцу
// export const fetchNews = createAsyncThunk<
//   NewsArticle[],
//   { year: number; month: number },
//   { rejectValue: string }
// >("news/fetchNews", async ({ year, month }, thunkAPI) => {
//   try {
//     const data = await fetchNewsApi(year, month);
//     return data.articles;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.message || "Ошибка загрузки новостей"
//     );
//   }
// });

// const newsSlice = createSlice({
//   name: "news",
//   initialState,
//   reducers: {
//     // Добавление новых новостей (например, для автообновления)
//     prependNews(state, action: PayloadAction<NewsArticle[]>) {
//       const newArticles = action.payload.filter(
//         (article) =>
//           !state.articles.some(
//             (existing) => existing.web_url === article.web_url
//           )
//       );
//       state.articles = sortArticlesByDate([...newArticles, ...state.articles]);
//     },
//     // Очистка списка новостей (при смене даты или обновлении)
//     clearNews(state) {
//       state.articles = [];
//       state.lastFetch = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchNews.pending, (state) => {
//       state.isLoading = true;
//       state.error = null;
//     });
//     builder.addCase(
//       fetchNews.fulfilled,
//       (state, action: PayloadAction<NewsArticle[]>) => {
//         state.isLoading = false;
//         state.articles = sortArticlesByDate(action.payload);
//         state.lastFetch = new Date().toISOString();
//       }
//     );
//     builder.addCase(fetchNews.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload || "Ошибка при загрузке новостей";
//     });
//   },
// });

// export const { prependNews, clearNews } = newsSlice.actions;
// export default newsSlice.reducer;
