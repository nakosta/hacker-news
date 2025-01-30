import { JSX } from "react";
import { Button } from "antd";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchNews } from "../../redux/slices/newsSlice";
import styles from "./index.module.css";

const ButtonUpdateNews = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.button}>
      <Button type="primary" onClick={() => dispatch(fetchNews())}>
        Обновить
      </Button>
    </div>
  );
};

export default ButtonUpdateNews;
