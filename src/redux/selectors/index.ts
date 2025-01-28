import { createSelector } from "reselect";
import type { RootState } from "../store";

const newsSelector = (state: RootState) => state.news;

export const selectNews = createSelector(
  [newsSelector],
  (newsState) => newsState.news
);

export const selectNewsStatus = createSelector(
  [newsSelector],
  (newsState) => newsState.status
);

export const selectNewsError = createSelector(
  [newsSelector],
  (newsState) => newsState.error
);

const storySelector = (state: RootState) => state.story;

export const selectStory = createSelector(
  [storySelector],
  (storyState) => storyState.story
);

export const selectStoryStatus = createSelector(
  [storySelector],
  (storyState) => storyState.status
);

export const selectStoryError = createSelector(
  [storySelector],
  (storyState) => storyState.error
);

const commentsSelector = (state: RootState) => state.comments;

export const selectComments = createSelector(
  [commentsSelector],
  (commentsState) => commentsState.comments
);

export const selectExpandedComments = createSelector(
  [commentsSelector],
  (commentsState) => commentsState.expandedComments
);

export const selectCommentsStatus = createSelector(
  [commentsSelector],
  (commentsState) => commentsState.status
);

export const selectCommentsError = createSelector(
  [commentsSelector],
  (commentsState) => commentsState.error
);
