import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api";
import { createAppAsyncThunk } from "../../hooks/hooks";
import { errors } from "../../utils/utils";
import { first100News } from "../../helpers/magicNums";

type NewsItem = {
  id: number;
  title: string;
  score: number;
  by: string;
  time: number;
  url: string;
};

type NewsState = {
  news: NewsItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
};

export const fetchNews = createAppAsyncThunk<
  NewsItem[],
  void,
  { rejectValue: string }
>("news/fetchNews", async (_, thunkAPI) => {
  try {
    const { data: ids } = await apiClient.get<number[]>("newstories.json");

    const topIds = ids.slice(0, first100News);

    const newsPromises = topIds.map((id) =>
      apiClient
        .get<NewsItem>(`item/${id}.json`)
        .then((response) => response.data)
    );

    const news = await Promise.all(newsPromises);

    return news.sort((a, b) => b.time - a.time);
  } catch (e) {
    const error = e as { message: string };
    return thunkAPI.rejectWithValue(error.message || errors.getNews);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || errors.getNews;
      });
  },
});

export default newsSlice.reducer;
