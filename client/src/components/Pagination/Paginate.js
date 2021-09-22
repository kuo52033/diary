import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Paper } from "@material-ui/core";
import useStyle from "./style";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPaginate } from "../../actions/posts";

const Paginate = ({ page }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();
  const { totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts(page));
    dispatch(getPaginate());
  }, [page, location, dispatch]);

  return (
    totalPages !== 0 && (
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
    )
  );
};

export default Paginate;
