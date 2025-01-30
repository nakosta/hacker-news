import { useEffect, JSX } from "react";
import { useParams } from "react-router-dom";
import { Divider } from "antd";
import StoryInfo from "../../components/StoryInfo";
import ButtonBack from "../../components/ButtonBack";
import SpinLoader from "../../components/SpinLoader";
import Comments from "../../components/Comments";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchStory } from "../../redux/slices/storySlice";
import { selectStoryStatus } from "../../redux/selectors";

import styles from "./index.module.css";

const NewsPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStoryStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchStory(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <SpinLoader />;
  }

  return (
    <div className={styles.container}>
      <StoryInfo />
      <ButtonBack />
      <Divider className={styles.divider} />
      <Comments />
    </div>
  );
};

export default NewsPage;
