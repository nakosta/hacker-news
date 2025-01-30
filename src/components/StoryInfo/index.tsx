import { JSX } from "react";
import { Typography } from "antd";
import ErrorText from "../ErrorText";
import { useAppSelector } from "../../hooks/hooks";
import { getFormatDate } from "../../utils/utils";
import { selectStory, selectStoryError } from "../../redux/selectors";

const { Title, Text } = Typography;

import styles from "./index.module.css";

const StoryInfo = (): JSX.Element => {
  const story = useAppSelector(selectStory);
  const error = useAppSelector(selectStoryError);

  if (!story) {
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
    </div>
  );
};

export default StoryInfo;
