import { JSX } from "react";
import { Typography } from "antd";
import styles from "./index.module.css";

const { Text } = Typography;

type ErrorText = {
  error: string | null;
};

const ErrorText = ({ error }: ErrorText): JSX.Element => {
  return (
    <Text type="danger" className={styles.error}>
      {error}
    </Text>
  );
};

export default ErrorText;
