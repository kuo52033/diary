import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import useStyle from "./styles";
import { Grid, Box, Card } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import Post from "./Post/Post";

const Posts = ({ urlTerm, urlTags }) => {
  const classes = useStyle();
  const location = useLocation();
  const { posts } = useSelector((state) => state.posts);

  return !posts ? (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {Array.from({ length: 12 }).map((ske, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
          <Card raised elevation={6} className={classes.skeletonCard}>
            <Skeleton
              variant="rect"
              animation="wave"
              className={classes.skeletonPhoto}
            />
            <Skeleton
              variant="text"
              width={55}
              className={classes.skeletonText}
            />
            <Skeleton
              variant="text"
              width={120}
              className={classes.skeletonText2}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <>
      {location.pathname === "/posts/search" && (
        <Box
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "25px",
            marginBottom: "35px",
          }}
        >
          {posts.length === 0
            ? `「 ${urlTerm !== "none" ? `標題 : ${urlTerm}` : ""}${
                urlTags !== "none" ? `標籤 : ${urlTags}` : ""
              } 」 查無資料`
            : `「 ${urlTerm !== "none" ? `標題 : ${urlTerm}` : ""}${
                urlTags !== "none" ? `標籤 : ${urlTags}` : ""
              } 」 共${posts.length}筆搜尋結果`}
        </Box>
      )}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {posts?.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
