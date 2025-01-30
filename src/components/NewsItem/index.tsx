import { useNavigate } from "react-router-dom";
import { List, Typography } from "antd";
import type { NewsItem } from "../../redux/slices/newsSlice";
import { getFormatDate } from "../../utils/utils";
import styles from "./index.module.css";

const { Title, Text } = Typography;

type NewsItemProps = {
  item: NewsItem;
};

const NewsItem = ({ item }: NewsItemProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <List.Item>
      <Title
        level={4}
        className={styles.listItem}
        onClick={() => navigate(`/${item.id}`)}
      >
        {item.title}
      </Title>
      <Text strong>Автор: </Text>
      {item.by}
      <br />
      <Text strong>Рейтинг: </Text>
      {item.score}
      <br />
      <Text strong>Опубликовано: </Text>
      {getFormatDate(item.time)}
    </List.Item>
  );
};

export default NewsItem;
