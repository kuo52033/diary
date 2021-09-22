import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";
import "moment/locale/zh-tw";

import useStyle from "./styles";
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Delete, MoreHoriz } from "@material-ui/icons";
import imageSvg from "../../../images/image2.svg";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import { deletePost, likePost, unLikePost } from "../../../actions/posts";
import { favoritePost, unFavoritePost } from "../../../actions/auth";
import { baseURL } from "../../../api";
import { OPEN_EDIT_POST } from "../../../constants/actionTypes";

const Post = ({ post }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const unmount = useRef(false);
  const { myData: user } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const [likes, setLikes] = useState(post.likesContain);
  const [likesLength, setLikeLength] = useState(post.likesLength);
  const [favoriteContain, setFavoriteContain] = useState(post.favoriteContain);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deletePostLoading, setDeletePostLoading] = useState(false);

  const handleLikes = () => {
    if (likes) {
      dispatch(unLikePost(post._id));
      setLikes(false);
      setLikeLength((pre) => pre - 1);
    } else {
      dispatch(likePost(post._id));
      setLikes(true);
      setLikeLength((pre) => pre + 1);
    }
  };

  const handleFavorite = () => {
    if (favoriteContain) {
      dispatch(unFavoritePost(post._id));
      setFavoriteContain(false);
    } else {
      dispatch(favoritePost(post._id));
      setFavoriteContain(true);
    }
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const clickEdit = () => {
    dispatch({ type: OPEN_EDIT_POST, payload: post });
  };

  const clickDelete = () => {
    setDeleteDialog(true);
  };

  const handleDeletePost = async () => {
    setDeletePostLoading(true);
    closeDeleteDialog();
    await dispatch(deletePost(post._id, history));
    if (!unmount.current) setDeletePostLoading(false);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const searchTag = (tag) => {
    history.push({
      pathname: "/posts/search",
      search: `?searchQuery=none&tags=${tag}`,
    });
  };

  const goUserProfile = () => {
    history.push(`/user/${post.creator._id}`);
  };

  useEffect(() => {
    return () => {
      unmount.current = true;
    };
  }, []);

  return (
    <Card className={classes.card} raised elevation={4}>
      <div
        className={classes.cardActionArea}
        onMouseLeave={() => setOpenMenu(false)}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectfile[0]
              ? `${baseURL}/static/postImage/${post.selectfile[0]}`
              : `${baseURL}/static/postImage/post_no_image.jpg`
          }
          title={post.title}
        />
        {user?._id === post.creator._id && (
          <div
            className={`${classes.overlay2} ${openMenu && "menuActive"}`}
            onClick={() => setOpenMenu((pre) => !pre)}
          >
            <MoreHoriz fontSize="medium" />
            <ul className={classes.dropdown}>
              <li className={classes.menuItem} onClick={clickEdit}>
                <EditIcon />
                編輯貼文
              </li>
              <li className={classes.menuItem} onClick={clickDelete}>
                <Delete />
                刪除貼文
              </li>
            </ul>
          </div>
        )}
        {user &&
          (favoriteContain ? (
            <div className={classes.BookIcon} onClick={handleFavorite}>
              <Tooltip title="取消收藏" placement="top">
                <BookmarkIcon fontSize="medium" color="error" />
              </Tooltip>
            </div>
          ) : (
            <div className={classes.BookIcon} onClick={handleFavorite}>
              <Tooltip title="收藏" placement="top">
                <BookmarkBorderIcon fontSize="medium" />
              </Tooltip>
            </div>
          ))}
        <span className={classes.imageAction} onClick={openPost} />
      </div>

      <img src={imageSvg} alt="" className={classes.imageSvg} />

      <Tooltip title={post.creator.name} placement="top">
        <Avatar
          onClick={goUserProfile}
          className={classes.avatar}
          src={
            post.creator.avatar
              ? `${baseURL}/static/avatar/${post.creator.avatar}`
              : `${baseURL}/static/avatar/default_avatar.jpg`
          }
        />
      </Tooltip>

      <Dialog
        open={deleteDialog}
        onClose={closeDeleteDialog}
        style={{ padding: "25px" }}
      >
        <DialogTitle>確定要刪除貼文嗎?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeletePost}>
            <CheckIcon />
            確定
          </Button>
          <Button onClick={closeDeleteDialog}>
            <CloseIcon />
            返回
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent className={classes.cardContent}>
        <Box
          style={{
            position: "absolute",
            width: "120px",
            top: "-12px",
            right: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {post.tags.map((tag, idx) => (
            <Chip
              key={idx}
              variant="outlined"
              label={tag}
              size="small"
              color="primary"
              onClick={() => searchTag(tag)}
              style={{ margin: "3px 3px", height: "20px" }}
            />
          ))}
        </Box>
        <Box className={classes.box}>
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ padding: "4px 26px", fontFamily: "inherit" }}
          >
            {moment(new Date()).format("YYYY年MM月DD日") ===
            moment(post.createAt).format("YYYY年MM月DD日")
              ? moment(post.createAt).locale("zh-tw").fromNow()
              : moment(post.createAt).isSame(new Date(), "year")
              ? moment(post.createAt).format("MM月DD日")
              : moment(post.createAt).format("YYYY年MM月DD日")}
          </Typography>
          <Typography
            className={classes.title}
            gutterBottom
            variant="subtitle1"
            component="h4"
            onClick={openPost}
          >
            {post.title}
          </Typography>
        </Box>
        <Box className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user}
            onClick={handleLikes}
          >
            {likes ? (
              <>
                <FavoriteIcon fontSize="small" style={{ marginRight: 5 }} />
                {likesLength}
              </>
            ) : (
              <>
                <FavoriteBorderIcon
                  fontSize="small"
                  style={{ marginRight: 5 }}
                />
                {likesLength}
              </>
            )}
          </Button>
          <Box className={classes.commentsSection}>
            <CommentOutlinedIcon />
            <Typography style={{ marginLeft: "5px" }}>
              {post.comments}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      {deletePostLoading && <span className={classes.deleteBox} />}
    </Card>
  );
};

export default React.memo(Post);
