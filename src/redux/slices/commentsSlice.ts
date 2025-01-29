import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../api";
import { createAppAsyncThunk } from "../../hooks/hooks";
import { errors } from "../../utils/utils";

type Comment = {
  id: number;
  by: string;
  time: number;
  text: string;
  kids?: number[];
};

type CommentsState = {
  comments: Record<number, Comment>;
  expandedComments: Record<number, boolean>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CommentsState = {
  comments: {},
  expandedComments: {},
  status: "idle",
  error: null,
};

export const fetchComments = createAppAsyncThunk<
  Comment[],
  number[],
  { rejectValue: string }
>("comments/fetchComments", async (ids, thunkAPI) => {
  try {
    const comments = await Promise.all(
      ids.map(async (id) => {
        const { data } = await apiClient.get<Comment>(`item/${id}.json`);
        return data;
      })
    );
    return comments;
  } catch (e) {
    const error = e as { message: string };
    return thunkAPI.rejectWithValue(error.message || errors.getComments);
  }
});

export const fetchChildComments = createAppAsyncThunk<
  Comment[],
  number,
  { rejectValue: string }
>("comments/fetchChildComments", async (id, thunkAPI) => {
  try {
    const { data } = await apiClient.get<Comment>(`item/${id}.json`);
    const childCommentsIds = data.kids || [];
    const childComments = await Promise.all(
      childCommentsIds.map(async (childId) => {
        const { data } = await apiClient.get<Comment>(`item/${childId}.json`);
        return data;
      })
    );
    return childComments;
  } catch (e) {
    const error = e as { message: string };
    return thunkAPI.rejectWithValue(error.message || errors.getComments);
  }
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    toggleExpand(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.expandedComments[id] = !state.expandedComments[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.forEach((comment) => {
          state.comments[comment.id] = comment;
        });
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || errors.getComments;
      })
      .addCase(fetchChildComments.fulfilled, (state, action) => {
        action.payload.forEach((comment) => {
          state.comments[comment.id] = comment;
        });
      });
  },
});

export const { toggleExpand } = commentsSlice.actions;

export default commentsSlice.reducer;
