import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyle from "./styles";
import { Button, Box, Container, Grow, InputBase } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

import { getPostsBySearch } from "../../actions/posts";

import Pagination from "../Pagination/Paginate";
import Posts from "../Posts/Posts";
import {
  OPEN_EDIT_POST,
  OPEN_SIDEBAR,
  CLEAN_POSTS,
} from "../../constants/actionTypes";

const Home = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const postsTop = useRef(null);
  const { myData: user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const page = query.get("page") || 1;
  const urlTerm = query.get("searchQuery");
  const urlTags = query.get("tags");

  //當網址有search query，執行搜尋貼文。
  useEffect(() => {
    if (urlTerm || urlTags) {
      dispatch(getPostsBySearch({ search: urlTerm, tags: urlTags }));
    }
    return () => {
      dispatch({ type: CLEAN_POSTS });
    };
  }, [urlTerm, urlTags, dispatch]);

  //搜尋文章 => enter
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      searchPosts();
    }
  };

  //搜尋
  const searchPosts = () => {
    if (searchTerm) {
      history.push(
        `/posts/search?searchQuery=${searchTerm.trim() || "none"}&tags=none`
      );
    }
  };

  return (
    <Grow in>
      <Container
        maxWidth="xl"
        style={{
          height: "100vh",
          overflow: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span ref={postsTop} />
        <Box className={classes.navbar}>
          <Button
            className={classes.sidebarMenu}
            onClick={() => dispatch({ type: OPEN_SIDEBAR })}
          >
            <MenuIcon fontSize="large" />
          </Button>
          <Button
            className={classes.searchIcon}
            onClick={() => setOpenSearch((pre) => !pre)}
          >
            <SearchIcon fontSize="large" />
          </Button>
          <Box
            className={
              openSearch
                ? `${classes.navbarSearch} active`
                : classes.navbarSearch
            }
          >
            <Box className={classes.searchBox}>
              <InputBase
                className={classes.searchInput}
                autoComplete="off"
                placeholder="標題"
                name="searchTerm"
                value={searchTerm}
                variant="outlined"
                color="primary"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Box>

            <Button
              variant="contained"
              onClick={searchPosts}
              className={classes.searchButton}
            >
              搜尋
            </Button>
          </Box>
          {user && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className={classes.createButton}
              onClick={() => dispatch({ type: OPEN_EDIT_POST, payload: null })}
            >
              新增貼文
            </Button>
          )}
        </Box>
        <Container maxWidth="lg">
          <Box sx={{ mt: 3, minHeight: "80vh" }}>
            <Posts urlTerm={urlTerm} urlTags={urlTags} />
          </Box>
        </Container>

        <Box
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!urlTerm && !urlTags && (
            <Pagination page={page} postsTop={postsTop} />
          )}
        </Box>
      </Container>
    </Grow>
  );
};

export default Home;
