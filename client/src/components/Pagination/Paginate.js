import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyle from "./style";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Paper } from "@material-ui/core";

import { getPosts, getPaginate } from "../../actions/posts";

const Paginate = ({ page }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();
  const unmount = useRef(false);
  const { totalPages } = useSelector((state) => state.posts);
  const [getPostsLoading, setGetPostsLoading] = useState(false);

  useEffect(() => {
    const startGetPosts = () => {
      dispatch(getPosts(page));
      dispatch(getPaginate());
    };
    const loading = async () => {
      setGetPostsLoading(true);
      await startGetPosts();
      if (!unmount.current) setGetPostsLoading(false);
    };
    loading();
    return () => {
      unmount.current = true;
    };
  }, [page, location, dispatch]);

  return (
    totalPages !== 0 && (
      <>
        <Paper className={classes.paginate} elevation={4}>
          <Pagination
            classes={{ ul: classes.ul }}
            variant="outlined"
            shape="rounded"
            count={totalPages}
            page={Number(page) || 1}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                component={Link}
                to={`/posts?page=${item.page}`}
              />
            )}
          />
        </Paper>
      </>
    )
  );
};

export default Paginate;
