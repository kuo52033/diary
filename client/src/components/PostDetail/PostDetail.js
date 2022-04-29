import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/zh-tw";

import useStyle from "./styles";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  CircularProgress,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  InputBase,
  InputAdornment,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendIcon from "@material-ui/icons/Send";
import Skeleton from "@material-ui/lab/Skeleton";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MenuIcon from "@material-ui/icons/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";

import {
  getPost,
  commentPost,
  likePost,
  deleteComment,
  unLikePost,
  deletePost,
} from "../../actions/posts";
import { favoritePost, unFavoritePost } from "../../actions/auth";
import ImageSilde from "./ImageSilde";
import {
  CLEAN_POST,
  UPDATE_USERACTIVE,
  UPDATE_USERFAVORITES,
  OPEN_SIDEBAR,
  OPEN_EDIT_POST,
} from "../../constants/actionTypes";

export const renderTime = (time) => {
  return moment(new Date()).format("YYYY年MM月DD日") ===
    moment(time).format("YYYY年MM月DD日")
    ? moment(time).locale("zh-tw").fromNow()
    : moment(time).isSame(new Date(), "year")
    ? moment(time).format("MM月DD日")
    : moment(time).format("YYYY年MM月DD日");
};

const PostDetail = ({ id, setcheckFullwidth, setOpenDialog }) => {
  const [comment, setComment] = useState("");
  const { post } = useSelector((state) => state.posts);
  const { myData: user } = useSelector((state) => state.auth);
  const [likesContain, setLikesContain] = useState(false);
  const [likesLength, setLikeLength] = useState(0);
  const [favoriteContain, setFavoriteContain] = useState(false);
  const [commentLoading, setcommentLoading] = useState(false);
  const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);
  const [deletePostLoading, setDeletePostLoading] = useState(false);
  const [openDeleteComment, setOpenDeleteComment] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const commentDom = useRef();
  const { postId } = useParams();
  const unmount = useRef(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        await dispatch(getPost(postId));
      } else {
        await dispatch(getPost(id));
      }
      if (!unmount.current) {
        const textarea = document.querySelector("#textarea");
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    fetchPost();

    return () => {
      unmount.current = true;
      if (setcheckFullwidth instanceof Function) setcheckFullwidth(true);
      dispatch({ type: CLEAN_POST });
    };
  }, [id, dispatch, postId, setcheckFullwidth]);

  useEffect(() => {
    if (post) {
      if (setcheckFullwidth instanceof Function)
        setcheckFullwidth(Boolean(post.selectfile.length !== 0));
      setLikesContain(post.likesContain);
      setLikeLength(post.likesLength);
      setFavoriteContain(post.favoriteContain);
    }
  }, [post, setcheckFullwidth]);

  const searchTag = (tag) => {
    history.push(`/posts/search?searchQuery=none&tags=${tag}`);
  };

  //新增評論
  const handleComment = async () => {
    setcommentLoading(true);
    setComment("");
    if (id) {
      dispatch({
        type: UPDATE_USERACTIVE,
        payload: { type: "comments", id, update: post.comments.length + 1 },
      });
    }
    await dispatch(commentPost(comment, post._id));

    if (!unmount.current) {
      commentDom.current.scrollIntoView({ behavior: "smooth" });
      setcommentLoading(false);
    }
  };

  //刪除評論
  const handleDeleteComment = async () => {
    setOpenDeleteComment(false);
    setDeleteCommentLoading(true);
    if (id) {
      dispatch({
        type: UPDATE_USERACTIVE,
        payload: { type: "comments", id, update: post.comments.length - 1 },
      });
    }
    await dispatch(deleteComment(deleteId, post._id));
    if (!unmount.current) setDeleteCommentLoading(false);
  };

  //案讚或取消讚
  const handleLikes = () => {
    if (likesContain) {
      dispatch(unLikePost(post._id));
      setLikesContain(false);
      setLikeLength((pre) => pre - 1);
      if (id) {
        dispatch({
          type: UPDATE_USERACTIVE,
          payload: { type: "likesLength", id, update: likesLength - 1 },
        });
      }
    } else {
      dispatch(likePost(post._id));
      setLikesContain(true);
      setLikeLength((pre) => pre + 1);
      if (id) {
        dispatch({
          type: UPDATE_USERACTIVE,
          payload: { type: "likesLength", id, update: likesLength + 1 },
        });
      }
    }
  };

  //收藏或取消收藏
  const handleFavorite = () => {
    if (favoriteContain) {
      dispatch(unFavoritePost(post._id));
      setFavoriteContain(false);
      if (!postId) dispatch({ type: UPDATE_USERFAVORITES, payload: post._id });
    } else {
      dispatch(favoritePost(post._id));
      setFavoriteContain(true);
    }
  };

  const clickDeleteComment = (id) => {
    setOpenDeleteComment(true);
    setDeleteId(id);
  };

  //刪除貼文
  const handleDeletePost = async () => {
    setOpenDeletePost(false);
    setDeletePostLoading(true);
    await dispatch(deletePost(post._id));
    if (postId) {
      if (!unmount.current) {
        history.replace("/posts");
      }
    } else {
      if (!unmount.current) setOpenDialog(false);
    }
  };

  const goUserProfile = (userId = null) => {
    if (id) setOpenDialog(false);
    if (userId) {
      history.push(`/user/${userId}`);
    } else {
      history.push(`/user/${post.creator._id}`);
    }
  };

  const postDetalSkeleton = () => (
    <Box className={classes.postdetailBox}>
      <div className={classes.imageBoxSkeleton}>
        <Skeleton
          variant="rect"
          animation="wave"
          className={classes.imageSkeleton}
        />
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "35%",
          // maxWidth: "35%",
          flexGrow: 1,
        }}
      >
        <div className={classes.header}>
          <Skeleton variant="circle" className={classes.avatar} />
          <Skeleton variant="text" width={190} height={40} />
        </div>
        <Divider />
        <div className={classes.content} />
        <Divider />
        <div style={{ marginLeft: "20px" }}>
          <Skeleton variant="text" width={250} height={40} />
          <Skeleton variant="text" width={100} height={40} />
          <Skeleton variant="text" width={160} height={40} />
        </div>
      </Box>
    </Box>
  );

  const postDetailComponent = () => (
    <Box className={classes.postdetailBox}>
      {post.selectfile.length !== 0 && (
        <div className={classes.imageSection}>
          <ImageSilde images={post.selectfile} />
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "35%",
          flexGrow: 1,
        }}
      >
        <div className={classes.header}>
          <Tooltip title={post.creator.name} placement="top">
            <Avatar
              onClick={() => goUserProfile()}
              src={
                post?.creator?.avatar
                  ? post.creator.avatar.url
                  : "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
              }
              className={classes.avatar}
            />
          </Tooltip>

          <Typography
            variant="h5"
            style={{ fontWeight: "bolder", fontFamily: "inherit" }}
          >
            {post.creator.name}
          </Typography>

          {user?._id === post.creator._id && (
            <Button
              className={classes.moreButton}
              style={{ right: postId ? 12 : 85 }}
            >
              <MoreHorizIcon fontSize="medium" />
              <ul className={classes.dropdown}>
                <li
                  className={classes.menuItem}
                  onClick={() =>
                    dispatch({ type: OPEN_EDIT_POST, payload: post })
                  }
                >
                  <EditIcon />
                  編輯貼文
                </li>
                <li
                  className={classes.menuItem}
                  onClick={() => setOpenDeletePost(true)}
                >
                  <DeleteIcon />
                  刪除貼文
                </li>
              </ul>
            </Button>
          )}

          {setOpenDialog instanceof Function && (
            <Button
              className={classes.closeDialog}
              onClick={() => setOpenDialog(false)}
            >
              <CloseIcon />
            </Button>
          )}
        </div>
        <Divider />
        <div className={classes.content}>
          <div ref={commentDom} />
          <Typography
            gutterBottom
            variant="h5"
            style={{ fontFamily: "inherit" }}
          >
            {post.title}
          </Typography>
          <textarea
            disabled
            id="textarea"
            value={post.message}
            className={classes.textarea}
          />
          <div className={classes.timeAndtag}>
            <Typography color="textSecondary" style={{ fontFamily: "inherit" }}>
              {renderTime(post.createAt)}
            </Typography>
            <div>
              {post.tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  variant="outlined"
                  label={tag}
                  size="medium"
                  color="primary"
                  onClick={() => searchTag(tag)}
                  style={{ margin: "3px 3px" }}
                />
              ))}
            </div>
          </div>
          <div className={classes.commentBox}>
            {post.comments.map((comment, idx) => (
              <div className={classes.eachComment} key={idx}>
                <Tooltip title={comment.user.name} placement="top">
                  <Avatar
                    onClick={() => goUserProfile(comment.user._id)}
                    src={
                      comment.user.avatar
                        ? comment.user.avatar.url
                        : "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
                    }
                    className={classes.avatar}
                  />
                </Tooltip>

                <div className={classes.commentAndtime}>
                  <Box
                    style={{
                      wordBreak: "break-all",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: "6px" }}>
                      {comment.user.name}
                    </span>
                    {comment.content}
                  </Box>
                  <Typography color="textSecondary">
                    {renderTime(comment.createAt)}
                  </Typography>
                </div>
                {user
                  ? user._id === comment.user._id && (
                      <div className={classes.deleteComment}>
                        <Button onClick={() => clickDeleteComment(comment._id)}>
                          <DeleteIcon style={{ color: "gray" }} />
                        </Button>
                      </div>
                    )
                  : null}
                {deleteCommentLoading && deleteId === comment._id && (
                  <span className={classes.deleteBox} />
                )}
              </div>
            ))}
          </div>
          <Dialog
            open={openDeleteComment}
            onClose={() => setOpenDeleteComment(false)}
          >
            <DialogTitle>確定要刪除評論嗎?</DialogTitle>
            <DialogActions>
              <Button onClick={handleDeleteComment}>
                <CheckIcon />
                確定
              </Button>
              <Button onClick={() => setOpenDeleteComment(false)}>
                <CloseIcon />
                返回
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDeletePost}
            onClose={() => setOpenDeletePost(false)}
            style={{ padding: "25px" }}
          >
            <DialogTitle>確定要刪除貼文嗎?</DialogTitle>
            <DialogActions>
              <Button onClick={handleDeletePost}>
                <CheckIcon />
                確定
              </Button>
              <Button onClick={() => setOpenDeletePost(false)}>
                <CloseIcon />
                返回
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Divider />
        <div className={classes.bottom}>
          <div className={classes.iconBox}>
            <div className={classes.likebox}>
              {user ? (
                <Tooltip
                  title={likesContain ? "取消按讚" : "案讚"}
                  placement="top"
                >
                  <Button onClick={handleLikes}>
                    {likesContain ? (
                      <FavoriteIcon className={classes.likeIcon} />
                    ) : (
                      <FavoriteBorderIcon className={classes.unLikeIcon} />
                    )}
                  </Button>
                </Tooltip>
              ) : (
                <Button disabled>
                  <FavoriteBorderIcon className={classes.unLikeIcon} />
                </Button>
              )}
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {likesLength}個讚
              </Typography>
            </div>
            {user ? (
              <Tooltip
                title={favoriteContain ? "取消收藏" : "收藏"}
                placement="top"
              >
                <Button onClick={handleFavorite}>
                  {favoriteContain ? (
                    <BookmarkIcon className={classes.favoriteIcon} />
                  ) : (
                    <BookmarkBorderIcon className={classes.favoriteIcon} />
                  )}
                </Button>
              </Tooltip>
            ) : (
              <Button disabled>
                <BookmarkBorderIcon className={classes.favoriteIcon} />
              </Button>
            )}
          </div>
          <Divider />
          <div style={{ position: "relative" }}>
            {commentLoading && (
              <div className={classes.commentLoading}>
                <CircularProgress style={{ color: "gray" }} />
              </div>
            )}
            <InputBase
              className={classes.commentInput}
              required
              name="comment"
              autoComplete="off"
              placeholder="留言。。"
              value={comment}
              fullWidth
              disabled={!Boolean(user) || commentLoading}
              onChange={(e) => setComment(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    onClick={handleComment}
                    disabled={
                      !Boolean(user) || commentLoading || !Boolean(comment)
                    }
                  >
                    <SendIcon />
                  </Button>
                </InputAdornment>
              }
            />
          </div>
        </div>
      </Box>
      {deletePostLoading && <span className={classes.deleteBox} />}
    </Box>
  );

  return postId ? (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Button
        className={classes.sidebarMenu}
        onClick={() => dispatch({ type: OPEN_SIDEBAR })}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Paper
        elevation={4}
        style={{ width: post?.selectfile?.length === 0 ? "70%" : "100%" }}
      >
        {!post ? postDetalSkeleton() : postDetailComponent()}
      </Paper>
    </Container>
  ) : (
    <>{!post ? postDetalSkeleton() : postDetailComponent()}</>
  );
};

export default PostDetail;
