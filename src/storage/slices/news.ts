import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import defaultState from "../defaultState";
import NewsActionServiceImpl from "../../services/news/NewsActionServiceImpl";
import { NewsState, News } from "../../typings/models/news";
import HttpServiceImpl from "../../services/http/HttpServiceImpl";
import LanguageServiceImpl from "../../services/language/LanguageServiceImpl";
import { sortNewsByDate, getPreviousMonth, groupNewsByDate } from "../../utils/dateUtils";
// import testData from "../../../tests/test.json";

const httpService = new HttpServiceImpl();
const languageService = new LanguageServiceImpl();
const newsService = new NewsActionServiceImpl(httpService, languageService);

const initialState: NewsState = {
  ...defaultState,
  news: {},
  meta: null,
  isNewsOutdated: false,
  lastFetch: null,
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  hasMore: true,
};

export const fetchCurrentMonth = createAsyncThunk<
  News.Base,
  void,
  { rejectValue: string }
>("news/fetchCurrentMonth", async (_, { rejectWithValue }) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const newsData: News.Base = await newsService.getNews(month, year);
    // const newsData: News.Base = testData.response as unknown as News.Base;
    return newsData;
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка получения новостей");
  }
});

export const fetchOlderMonth = createAsyncThunk<
  { newsData: News.Base; newYear: number; newMonth: number },
  void,
  { state: { news: NewsState }; rejectValue: string }
>("news/fetchOlderMonth", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState().news;
    const { currentYear, currentMonth } = state;
    const { year: newYear, month: newMonth } = getPreviousMonth(
      currentYear,
      currentMonth
    );
    const newsData: News.Base = await newsService.getNews(newMonth, newYear);
    return { newsData, newYear, newMonth };
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка получения новостей");
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews(state) {
      state.news = {};
      state.meta = null;
      state.lastFetch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentMonth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentMonth.fulfilled, (state, action: PayloadAction<News.Base>) => {
        state.isLoading = false;
        const newDocs = action.payload.docs;
        const currentNews = Object.values(state.news).flat();
        const allNews = [...currentNews, ...newDocs].filter(
          (doc, index, self) => index === self.findIndex((d) => d._id === doc._id)
        );
        state.news = groupNewsByDate(sortNewsByDate(allNews));
        state.meta = action.payload.meta;
        state.lastFetch = new Date().toISOString();
        state.isNewsOutdated = false;
      })
      .addCase(fetchCurrentMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Неизвестная ошибка";
      })
      .addCase(fetchOlderMonth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOlderMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        const { newsData, newYear, newMonth } = action.payload;
        const currentNews = Object.values(state.news).flat();
        const allNews = [...currentNews, ...newsData.docs].filter(
          (doc, index, self) => index === self.findIndex((d) => d._id === doc._id)
        );
        state.news = groupNewsByDate(sortNewsByDate(allNews));
        state.meta = newsData.meta;
        state.currentYear = newYear;
        state.currentMonth = newMonth;
        if (newYear < 1851 || (newYear === 1851 && newMonth < 9)) {
          state.hasMore = false;
        }
      })
      .addCase(fetchOlderMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Неизвестная ошибка";
      });
  },
});

export const { clearNews } = newsSlice.actions;
export default newsSlice.reducer;