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
import Chat from "@material-ui/icons/Chat";

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

  const renderLink = (path, name, Icon) => {
    return (
      <Link to={path} className={classes.listLink}>
        <li
          className={`${classes.listItem} ${pathname === path && "page"} ${
            pathname !== path && classes.listItemHover
          } ${openMenu && "active"}`}
        >
          <Box className={`${classes.listItemBox} ${openMenu && "active"}`}>
            <Icon className={`${classes.listIcon} ${openMenu && "active"}`} />
            <Box>{name}</Box>
          </Box>
        </li>
      </Link>
    );
  };

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
        {renderLink("/posts", "貼文列表", LibraryBooksIcon)}
        {!user && renderLink("/auth", "登入", LockIcon)}
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
            {renderLink(`/user/${user._id}`, "個人資料", PersonIcon)}
            {renderLink(`/user/${user._id}/favorite`, "我的收藏", BookmarkIcon)}
            {renderLink("/chat", "聊天室", Chat)}
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
