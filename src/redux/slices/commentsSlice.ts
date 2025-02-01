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
  loadingComments: Record<number, boolean>;
  initialLoading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: {},
  expandedComments: {},
  loadingComments: {},
  initialLoading: true,
  error: null,
};

export const fetchComments = createAppAsyncThunk<
  Comment[],
  number[],
  { rejectValue: string }
>("comments/fetchComments", async (ids, thunkAPI) => {
  try {
    const comments = await Promise.all(
      ids.map((id) =>
        apiClient
          .get<Comment>(`item/${id}.json`)
          .then((response) => response.data)
      )
    );

    return comments;
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
    setLoading(
      state,
      action: PayloadAction<{ id: number; isLoading: boolean }>
    ) {
      const { id, isLoading } = action.payload;
      state.loadingComments[id] = isLoading;
    },
    resetComments(state) {
      state.comments = {};
      state.expandedComments = {};
      state.loadingComments = {};
      state.initialLoading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        if (Object.keys(state.comments).length === 0) {
          state.initialLoading = true;
        }
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        action.payload.forEach((comment) => {
          state.comments[comment.id] = comment;
          state.loadingComments[comment.id] = false;
        });

        if (state.initialLoading) {
          state.initialLoading = false;
        }
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.payload || errors.getComments;
        state.initialLoading = false;
      });
  },
});

export const { toggleExpand, setLoading, resetComments } =
  commentsSlice.actions;
export default commentsSlice.reducer;
