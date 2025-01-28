import { JSX } from "react";
import { Spin } from "antd";
import styles from "./index.module.css";

const SpinLoader = (): JSX.Element => {
  return <Spin size="large" className={styles.loader} />;
};

export default SpinLoader;
