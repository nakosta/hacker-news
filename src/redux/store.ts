import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import storyReducer from "./slices/storySlice";
import commentsReducer from "./slices/commentsSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    story: storyReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
