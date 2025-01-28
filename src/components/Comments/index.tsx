import { useEffect } from "react";
import { Typography, Button } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import SpinLoader from "../SpinLoader";
import {
  fetchComments,
  fetchChildComments,
  toggleExpand,
} from "../../redux/slices/commentsSlice";
import {
  selectComments,
  selectExpandedComments,
  selectCommentsStatus,
} from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFormatDate, getCountReply, parseCommentText } from "../../utils";
import styles from "./index.module.css";

const { Title, Text } = Typography;

interface CommentsProps {
  ids: number[];
}

const Comments = ({ ids }: CommentsProps) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(selectComments);
  const expandedComments = useAppSelector(selectExpandedComments);
  const status = useAppSelector(selectCommentsStatus);

  useEffect(() => {
    if (ids.length > 0) {
      dispatch(fetchComments(ids));
    }
  }, [ids, dispatch]);

  if (status === "loading") {
    return <SpinLoader />;
  }

  const handleToggleExpand = (id: number) => {
    if (!expandedComments[id]) {
      dispatch(fetchChildComments(id));
    }
    dispatch(toggleExpand(id));
  };

  const renderComments = (ids: number[]) =>
    ids.map((id) => {
      const comment = comments[id];
      if (!comment) return null;

      return (
        <div key={id} className={styles.commentContainer}>
          <div className={styles.commentHead}>
            <Text strong>{comment.by}</Text> -{" "}
            <Text>{getFormatDate(comment.time)}</Text>
          </div>
          <div>{parseCommentText(comment.text)}</div>
          {comment.kids && (
            <div className={styles.replyContainer}>
              <Button
                size="small"
                type="link"
                onClick={() => handleToggleExpand(id)}
              >
                {expandedComments[id] ? <UpOutlined /> : <DownOutlined />}
                <span className={styles.buttonText}>
                  {getCountReply(comment.kids.length)}
                </span>
              </Button>
              {expandedComments[id] && (
                <div className={styles.childComments}>
                  {renderComments(comment.kids)}
                </div>
              )}
            </div>
          )}
        </div>
      );
    });

  return (
    <>
      <Title className={styles.title} level={3}>
        Комментарии:
      </Title>
      <div className={styles.commentsWrapper}>{renderComments(ids)}</div>
      <div className={styles.button}>
        <Button type="primary" onClick={() => dispatch(fetchComments(ids))}>
          Обновить
        </Button>
      </div>
    </>
  );
};

export default Comments;
