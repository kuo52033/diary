import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useStyle from "./styles";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LockIcon from "@material-ui/icons/Lock";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";

import { CLOSE_SIDEBAR, OPEN_EDIT_POST } from "../../constants/actionTypes";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();
  const { sidebar, progress } = useSelector((state) => state.status);
  const { myData: user } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const matchMD = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = location.pathname;

  useEffect(() => {
    if (matchMD) setOpenMenu(false);
    dispatch({ type: CLOSE_SIDEBAR });
  }, [matchMD, dispatch, location]);

  const navbarComponent = () => (
    <Box
      className={`${matchMD ? classes.appbar2 : classes.appBar} ${
        openMenu && "active"
      }`}
    >
      <div className={classes.menu}>
        <Button
          onClick={() =>
            matchMD
              ? dispatch({ type: CLOSE_SIDEBAR })
              : setOpenMenu((pre) => !pre)
          }
        >
          <MenuIcon fontSize="large" />
        </Button>
      </div>
      <Box
        className={
          openMenu ? `${classes.brandContainer} active` : classes.brandContainer
        }
        component={Link}
        to="/posts"
      >
        <img
          src="https://res.cloudinary.com/dhawohjee/image/upload/v1648186659/diary/logo1_ggvdpl.png"
          alt=""
          height="80"
        />
      </Box>

      {user && (
        <Box className={`${classes.userAvatarBox} ${openMenu && "active"}`}>
          {openMenu ? (
            <Tooltip title={user.name} placement="top">
              <Avatar
                className={classes.userAvatar}
                src={
                  user.avatar
                    ? user.avatar
                    : "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
                }
              />
            </Tooltip>
          ) : (
            <Avatar
              className={classes.userAvatar}
              src={
                user.avatar
                  ? user.avatar
                  : "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
              }
            />
          )}

          <Typography className={classes.avatarName}>{user.name}</Typography>
        </Box>
      )}

      <ul>
        <Link to="/posts" className={classes.listLink}>
          <li
            className={`${classes.listItem} ${
              pathname === "/posts" && "page"
            } ${pathname !== "/posts" && classes.listItemHover} ${
              openMenu && "active"
            }`}
          >
            <Box className={`${classes.listItemBox} ${openMenu && "active"}`}>
              <LibraryBooksIcon
                className={`${classes.listIcon} ${openMenu && "active"}`}
              />
              <Box>貼文列表</Box>
            </Box>
          </li>
        </Link>

        {!user && (
          <Link to="/auth" className={classes.listLink}>
            <li
              className={`${classes.listItem} ${
                pathname === "/auth" && "page"
              } ${pathname !== "/auth" && classes.listItemHover} ${
                openMenu && "active"
              }`}
            >
              <Box className={`${classes.listItemBox} ${openMenu && "active"}`}>
                <LockIcon
                  className={`${classes.listIcon} ${openMenu && "active"}`}
                />
                <Box>登入</Box>
              </Box>
            </li>
          </Link>
        )}
        {user && (
          <>
            <li
              className={`${classes.listItem} ${classes.listItemHover} ${
                openMenu && "active"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => dispatch({ type: OPEN_EDIT_POST, payload: null })}
            >
              <Box className={`${classes.listItemBox} ${openMenu && "active"}`}>
                <AddIcon
                  className={`${classes.listIcon} ${openMenu && "active"}`}
                />
                <Box>新增貼文</Box>
              </Box>
            </li>
            <Link to={`/user/${user._id}`} className={classes.listLink}>
              <li
                className={`${classes.listItem} ${
                  pathname === `/user/${user._id}` && "page"
                } ${
                  pathname !== `/user/${user._id}` && classes.listItemHover
                } ${openMenu && "active"}`}
              >
                <Box
                  className={`${classes.listItemBox} ${openMenu && "active"}`}
                >
                  <PersonIcon
                    className={`${classes.listIcon} ${openMenu && "active"}`}
                  />
                  <Box>個人資料</Box>
                </Box>
              </li>
            </Link>
            <Link
              to={`/user/${user._id}/favorite`}
              className={classes.listLink}
            >
              <li
                className={`${classes.listItem} ${
                  pathname === `/user/${user._id}/favorite` && "page"
                } ${
                  pathname !== `/user/${user._id}/favorite` &&
                  classes.listItemHover
                } ${openMenu && "active"}`}
              >
                <Box
                  className={`${classes.listItemBox} ${openMenu && "active"}`}
                >
                  <BookmarkIcon
                    className={`${classes.listIcon} ${openMenu && "active"}`}
                  />
                  <Box>我的收藏</Box>
                </Box>
              </li>
            </Link>

            <li
              className={`${classes.listItem} ${classes.listItemHover} ${
                openMenu && "active"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(logout())}
            >
              <Box className={`${classes.listItemBox} ${openMenu && "active"}`}>
                <ExitToAppIcon
                  className={`${classes.listIcon} ${openMenu && "active"}`}
                />
                <Box>登出</Box>
              </Box>
            </li>
          </>
        )}
      </ul>
      {progress && (
        <Box className={`${classes.circularBox} ${openMenu && "active"}`}>
          <CircularProgress
            size={25}
            style={{ color: "gray" }}
            className={`${classes.circular} ${openMenu && "active"}`}
          />
          <Box style={{ color: "grey" }}>處理中</Box>
        </Box>
      )}
    </Box>
  );

  return matchMD ? (
    <Drawer
      anchor="left"
      open={sidebar}
      onClose={() => dispatch({ type: CLOSE_SIDEBAR })}
    >
      {navbarComponent()}
    </Drawer>
  ) : (
    <>{navbarComponent()}</>
  );
};

export default Navbar;
