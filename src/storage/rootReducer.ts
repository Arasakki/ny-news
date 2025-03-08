import { combineReducers } from "@reduxjs/toolkit";
import newsSlice from "./slices/news";
const rootReducer = combineReducers({
  news: newsSlice,

});

export default rootReducer;
