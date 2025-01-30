import { useEffect } from "react";
import { List } from "antd";
import ButtonUpdateNews from "../../components/ButtonUpdateNews";
import NewsItem from "../../components/NewsItem";
import SpinLoader from "../../components/SpinLoader";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchNews } from "../../redux/slices/newsSlice";
import { selectNews, selectNewsStatus } from "../../redux/selectors";
import styles from "./index.module.css";

const NewsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const status = useAppSelector(selectNewsStatus);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (status === "loading") {
    return <SpinLoader />;
  }

  return (
    <div className={styles.container}>
      <ButtonUpdateNews />
      <List
        itemLayout="vertical"
        dataSource={news}
        renderItem={(item) => <NewsItem item={item} />}
      />
    </div>
  );
};

export default NewsList;
