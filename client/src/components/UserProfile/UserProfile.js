import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  matchRoutes,
  useNavigate,
  useParams,
  useLocation,
  Outlet,
} from "react-router-dom";

import useStyle from "./styles";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Slide,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MenuIcon from "@material-ui/icons/Menu";

import {
  getUserProfile,
  getUserPostLength,
  updateUserAvatar,
} from "../../actions/auth";
import EditProfile from "./UserProfileInner/About/EditProfile";
import { OPEN_SIDEBAR, CLEAN_USER_DATA } from "../../constants/actionTypes";
import ProfileDetailList from "./ProfileDetailList";
import Skeleton from "@material-ui/lab/Skeleton";

const UserProfile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const classes = useStyle();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const avatarRef = useRef();
  const unmount = useRef();
  const {
    myData: user,
    userProfile,
    userPostLength,
  } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const matchRoute = matchRoutes(
    [{ path: "/user/:userId/favorite" }, { path: "/user/:userId" }],
    location
  );

  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(getUserPostLength(userId));

    return () => {
      unmount.current = true;
      dispatch({ type: CLEAN_USER_DATA });
    };
  }, [dispatch, userId]);

  const handleImage = async (e) => {
    const image = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("avatar", image);
    setImageLoading(true);
    await dispatch(updateUserAvatar(formData));
    if (unmount.current) return;
    setImageLoading(false);

    if (
      !image?.type.match(/image.jpg/) &&
      !image?.type.match(/image.jpeg/) &&
      !image?.type.match(/image.png/)
    ) {
      return;
    }
    const reader = new FileReader();
    reader.readpathname(image);
    reader.onload = () => {
      avatarRef.current.src = reader.result;
    };
  };

  // const router = () => {
  //   return (
  //     <Routes>
  //       <Route path={path} exact component={MyPosts} />
  //       <Route path={`${path}/favorite`} exact component={MyPosts} />
  //     </Routes>
  //   );
  // };

  return (
    <Slide in unmountOnExit mountOnEnter direction="left">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper className={classes.paper} elevation={3}>
          <Button
            className={classes.sidebarMenu}
            onClick={() => dispatch({ type: OPEN_SIDEBAR })}
          >
            <MenuIcon fontSize="large" />
          </Button>
          <Box
            className={
              viewMore ? `${classes.containerTop} active` : classes.containerTop
            }
          >
            <Box className={classes.avatarBox}>
              <img
                ref={avatarRef}
                alt=""
                className={classes.userAvatar}
                src={
                  userProfile?.avatar
                    ? userProfile.avatar
                    : "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
                }
              />
              {imageLoading && (
                <span className={classes.imageLoading}>
                  <CircularProgress
                    style={{ color: "gray", width: "25px", height: "25px" }}
                  />
                </span>
              )}
              {userId === user?._id && (
                <>
                  <input
                    id="avatarUpload"
                    className={classes.imageInput}
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                  />
                  <label
                    className={`${classes.imageInputLabel} ${
                      imageLoading && "disable"
                    }`}
                    htmlFor="avatarUpload"
                  >
                    <CameraAltIcon />
                  </label>
                </>
              )}
            </Box>
            {userProfile && userPostLength !== null ? (
              <>
                <Box className={classes.allProfileBox}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                      {userProfile?.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      style={{ marginLeft: "35px", fontWeight: "bolder" }}
                    >
                      {userPostLength} 貼文
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    className={classes.profileSection}
                  >
                    {userProfile?.personalProfile}
                  </Typography>
                  <div
                    className={
                      viewMore
                        ? `${classes.detailsBox} active`
                        : classes.detailsBox
                    }
                  >
                    <ProfileDetailList />
                  </div>

                  <div
                    className={classes.moreDetailsBox}
                    onClick={() => setViewMore((pre) => !pre)}
                  >
                    {viewMore ? (
                      <>
                        <Typography variant="caption" color="textSecondary">
                          收回
                        </Typography>
                        <KeyboardArrowUpIcon
                          style={{
                            fontSize: "18px",
                            color: "gray",
                            marginLeft: "3px",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="caption" color="textSecondary">
                          查看更多
                        </Typography>
                        <KeyboardArrowDownIcon
                          style={{
                            fontSize: "18px",
                            color: "gray",
                            marginLeft: "3px",
                          }}
                        />
                      </>
                    )}
                  </div>
                </Box>
                {userId === user?._id && (
                  <Button
                    className={classes.updateButton}
                    startIcon={<EditIcon />}
                    onClick={() => setOpenEdit(true)}
                  >
                    編輯個人資料
                  </Button>
                )}
              </>
            ) : (
              <Box className={classes.allProfileBox}>
                <Skeleton variant="text" width={200} height={40} />
              </Box>
            )}
          </Box>

          <Dialog
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            maxWidth="sm"
            fullWidth
          >
            <EditProfile
              handleImage={handleImage}
              setOpenEdit={setOpenEdit}
              imageLoading={imageLoading}
            />
          </Dialog>

          <Divider style={{ width: "100%", marginTop: "15px" }} />

          <List className={classes.list}>
            <ListItem
              className={
                matchRoute[0].route.path === "/user/:userId"
                  ? classes.listItemActive
                  : classes.listItem
              }
              button
              onClick={() => navigate("")}
            >
              <ViewModuleIcon />
              <ListItemText primary="貼文" style={{ marginLeft: "7px" }} />
            </ListItem>
            <ListItem
              className={
                matchRoute[0].route.path === "/user/:userId/favorite"
                  ? classes.listItemActive
                  : classes.listItem
              }
              button
              onClick={() => navigate(`favorite`)}
            >
              <BookmarkBorderIcon />
              <ListItemText primary="珍藏" style={{ marginLeft: "7px" }} />
            </ListItem>
          </List>
        </Paper>
        <Outlet />
      </Box>
    </Slide>
  );
};

export default UserProfile;
