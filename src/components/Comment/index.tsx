import { Typography, Button } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import {
  fetchComments,
  toggleExpand,
  setLoading,
} from "../../redux/slices/commentsSlice";
import {
  selectComments,
  selectExpandedComments,
  selectCommentsLoading,
} from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getFormatDate,
  getCountReply,
  parseCommentText,
} from "../../utils/utils";
import SpinLoader from "../SpinLoader";
import styles from "./index.module.css";

const { Text } = Typography;

type CommentProps = {
  ids: number[];
};

const Comment = ({ ids }: CommentProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const expandedComments = useAppSelector(selectExpandedComments);
  const loadingComments = useAppSelector(selectCommentsLoading);

  const handleToggleExpand = (kids: number[]) => {
    const areChildrenLoaded = kids.every((childId) => comments[childId]);

    if (!areChildrenLoaded) {
      dispatch(setLoading({ id: kids[0], isLoading: true }));
      dispatch(fetchComments(kids));
    }

    dispatch(toggleExpand(kids[0]));
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
                onClick={() => comment.kids && handleToggleExpand(comment.kids)}
                disabled={loadingComments[comment.kids[0]]}
              >
                {expandedComments[comment.kids[0]] ? (
                  <UpOutlined />
                ) : (
                  <DownOutlined />
                )}
                <span className={styles.buttonText}>
                  {getCountReply(comment.kids.length)}
                </span>
              </Button>
              {loadingComments[comment.kids[0]] ? (
                <SpinLoader />
              ) : (
                expandedComments[comment.kids[0]] && (
                  <div className={styles.childComments}>
                    {renderComments(comment.kids)}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      );
    });

  return <div className={styles.commentsWrapper}>{renderComments(ids)}</div>;
};

export default Comment;
