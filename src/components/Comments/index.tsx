import { useEffect } from "react";
import { Typography, Button } from "antd";
import Comment from "../Comment";
import SpinLoader from "../SpinLoader";
import {
  fetchComments,
  resetInitialLoading,
} from "../../redux/slices/commentsSlice";
import {
  selectCommentsInitialLoading,
  selectStory,
} from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import styles from "./index.module.css";

const { Title, Text } = Typography;

const Comments = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const story = useAppSelector(selectStory);
  const initialLoading = useAppSelector(selectCommentsInitialLoading);

  useEffect(() => {
    if (story?.kids) {
      dispatch(fetchComments(story.kids));
    }
    return () => {
      dispatch(resetInitialLoading());
    };
  }, [story?.kids, dispatch]);

  if (!story?.kids) {
    return <Text>Комментариев пока нет.</Text>;
  }

  if (initialLoading) {
    return <SpinLoader />;
  }

  return (
    <>
      <Title className={styles.title} level={3}>
        Комментарии:
      </Title>
      <Comment ids={story.kids} />
      <div className={styles.button}>
        <Button
          type="primary"
          onClick={() => {
            if (story.kids) {
              dispatch(resetInitialLoading());
              dispatch(fetchComments(story.kids));
            }
          }}
        >
          Обновить
        </Button>
      </div>
    </>
  );
};

export default Comments;
