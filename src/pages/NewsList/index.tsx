import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, Typography, Button } from "antd";
import SpinLoader from "../../components/SpinLoader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFormatDate } from "../../utils/utils";
import { fetchNews } from "../../redux/slices/newsSlice";
import { selectNews, selectNewsStatus } from "../../redux/selectors";
import styles from "./index.module.css";

const { Title, Text } = Typography;

const NewsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const status = useAppSelector(selectNewsStatus);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (status === "loading") {
    return <SpinLoader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Button type="primary" onClick={() => dispatch(fetchNews())}>
          Обновить
        </Button>
      </div>
      <List
        itemLayout="vertical"
        dataSource={news}
        renderItem={(item) => (
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
        )}
      />
    </div>
  );
};

export default NewsList;
