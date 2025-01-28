import { JSX } from "react";
import { Layout, Typography } from "antd";
import styles from "./index.module.css";

const { Header } = Layout;
const { Title } = Typography;

const HeaderSite = (): JSX.Element => {
  return (
    <Header className={styles.header}>
      <img
        src="/header_icon.svg"
        alt="Logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={styles.logo}
      />
      <Title level={1}>Hacker News</Title>
    </Header>
  );
};

export default HeaderSite;
