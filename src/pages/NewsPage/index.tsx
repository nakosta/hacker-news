import { useEffect, JSX } from "react";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "antd";
import BackButton from "../../components/BackButton";
import SpinLoader from "../../components/SpinLoader";
import ErrorText from "../../components/ErrorText";
import Comments from "../../components/Comments";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFormatDate } from "../../utils";
import { fetchStory } from "../../redux/slices/storySlice";
import {
  selectStory,
  selectStoryStatus,
  selectStoryError,
} from "../../redux/selectors";

const { Title, Text } = Typography;

import styles from "./index.module.css";

const NewsPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const story = useAppSelector(selectStory);
  const status = useAppSelector(selectStoryStatus);
  const error = useAppSelector(selectStoryError);

  useEffect(() => {
    if (id) {
      dispatch(fetchStory(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <SpinLoader />;
  }

  if (status === "failed" || !story) {
    return <ErrorText error={error} />;
  }

  return (
    <div className={styles.container}>
      <Title level={3} className={styles.listItem}>
        {story.title}
      </Title>
      <div>
        <Text strong>
          Ссылка:{" "}
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            {story.url}
          </a>
        </Text>
      </div>
      <div>
        <Text strong>Автор: </Text>
        {story.by}
      </div>
      <div>
        <Text strong>Комментарии: </Text>
        {story.descendants}
      </div>
      <div>
        <Text strong>Опубликовано: </Text>
        {getFormatDate(story.time)}
      </div>
      <BackButton />
      <Divider className={styles.divider}/>
      {story.kids ? (
        <Comments ids={story.kids} />
      ) : (
        <Text>Комментариев пока нет.</Text>
      )}
    </div>
  );
};

export default NewsPage;
