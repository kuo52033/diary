import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyle from "./style";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { CircularProgress, Paper } from "@material-ui/core";

import { getPosts, getPaginate } from "../../actions/posts";

const Paginate = ({ page, postsTop }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();
  const unmount = useRef(false);
  const { totalPages } = useSelector((state) => state.posts);
  const [getPostsLoading, setGetPostsLoading] = useState(false);

  useEffect(() => {
    const loading = async () => {
      setGetPostsLoading(true);
      await Promise.all([dispatch(getPosts(page)), dispatch(getPaginate())]);
      if (!unmount.current) {
        setGetPostsLoading(false);
        postsTop.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    loading();
  }, [page, location, dispatch, postsTop]);

  useEffect(() => {
    return () => {
      unmount.current = true;
    };
  }, []);

  return (
    totalPages !== 0 && (
      <>
        <Paper className={classes.paginate} elevation={2}>
          <Pagination
            classes={{ ul: classes.ul }}
            count={totalPages}
            size="small"
            page={Number(page) || 1}
            hidePrevButton
            hideNextButton
            renderItem={(item) => (
              <PaginationItem
                {...item}
                component={Link}
                to={`/posts?page=${item.page}`}
              />
            )}
          />
        </Paper>
        {getPostsLoading && (
          <CircularProgress size={25} className={classes.circular} />
        )}
      </>
    )
  );
};

export default Paginate;
