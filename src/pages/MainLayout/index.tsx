import { JSX } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import HeaderSite from "../../components/HeaderSite";
import styles from "./index.module.css";

const MainLayout = (): JSX.Element => {
  return (
    <Layout className={styles.layout}>
      <HeaderSite />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
