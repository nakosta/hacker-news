import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api";
import { createAppAsyncThunk } from "../../hooks";
import { errors } from "../../utils/utils";

type Story = {
  id: number;
  title: string;
  by: string;
  time: number;
  url: string;
  descendants: number;
  kids?: number[];
};

type StoryState = {
  story: Story | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: StoryState = {
  story: null,
  status: "idle",
  error: null,
};

export const fetchStory = createAppAsyncThunk<
  Story,
  string,
  { rejectValue: string }
>("story/fetchStory", async (id, thunkAPI) => {
  try {
    const { data } = await apiClient.get<Story>(`item/${id}.json`);
    console.log(data);
    return data;
  } catch (e) {
    const error = e as { message: string };
    return thunkAPI.rejectWithValue(error.message || errors.getStory);
  }
});

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.story = action.payload;
      })
      .addCase(fetchStory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || errors.getStory;
      });
  },
});

export default storySlice.reducer;
