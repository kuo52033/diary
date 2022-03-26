import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";

import useStyle from "./styles";
import {
  Grid,
  Container,
  Box,
  Dialog,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import FavoriteIcon from "@material-ui/icons/Favorite";

import PostDetail from "../../../PostDetail/PostDetail";
import { getPostsbyUser, getUserFavorites } from "../../../../actions/posts";

const MyPosts = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [postId, setPostId] = useState(null);
  const [checkFullwidth, setCheckFullwidth] = useState(true);
  const { userId } = useParams();
  const { path } = useRouteMatch();

  const posts = useSelector((state) =>
    path === "/user/:userId" ? state.auth.userPosts : state.auth.userFavorites
  );

  // const observe = useRef();
  // const lastEL = useCallback(
  //   (node) => {
  //     if (loadingPosts) return;
  //     observe.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setPage((prev) => prev + 1);
  //         observe.current.disconnect();
  //       }
  //     });
  //     if (node) observe.current.observe(node);
  //   },
  //   [loadingPosts]
  // );

  const openDetailPost = (id) => {
    setOpenDialog(true);
    setPostId(id);
  };

  useEffect(() => {
    if (path === "/user/:userId") {
      dispatch(getPostsbyUser(userId));
    } else {
      dispatch(getUserFavorites(userId));
    }
  }, [dispatch, userId, path]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      {!posts ? (
        <Box style={{ display: "grid", placeItems: "center", height: "55vh" }}>
          <CircularProgress style={{ color: "gray" }} />
        </Box>
      ) : posts?.length === 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            {path === "/user/:userId" ? "未創建貼文" : "未有珍藏貼文"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {posts?.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4} lg={4}>
              <div
                className={classes.postContainer}
                onClick={() => openDetailPost(post._id)}
              >
                <img
                  alt=""
                  src={
                    post.selectfileFirst
                      ? post.selectfileFirst.url
                      : "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                  }
                  className={classes.img}
                />
                <span className={classes.imageAction}>
                  <Box className={classes.iconContainer}>
                    <FavoriteIcon
                      style={{ fontSize: "35px", marginRight: "5px" }}
                    />
                    {post.likesLength}
                  </Box>
                  <Box className={classes.iconContainer}>
                    <ModeCommentIcon
                      style={{ fontSize: "35px", marginRight: "5px" }}
                    />
                    {post.comments}
                  </Box>
                </span>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth={checkFullwidth ? "lg" : "sm"}
        fullWidth
      >
        <PostDetail
          id={postId}
          setcheckFullwidth={setCheckFullwidth}
          setOpenDialog={setOpenDialog}
        />
      </Dialog>
    </Container>
  );
};

export default MyPosts;
