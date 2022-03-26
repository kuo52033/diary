import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import useStyle from "./styles";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Dialog,
  Typography,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { updateUserProfile } from "../../../../actions/auth";
import DetailsProfile from "./DetailsProfile";
import ProfileDetailList from "../../ProfileDetailList";

const EditProfile = ({
  handleImage,
  setOpenEdit: setOuterEdit,
  imageLoading,
}) => {
  const classes = useStyle();
  const { myData: user, userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [openEdit, setOpenEdit] = useState({
    DetailsDialog: false,
    PersonalProfileInput: false,
    nameEdit: false,
  });
  const [personalProfile, setPersonalProfile] = useState(
    userProfile?.personalProfile
  );
  const [name, setName] = useState(userProfile?.name);

  const saveProfile = () => {
    dispatch(updateUserProfile(personalProfile, "personalProfile"));
    setOpenEdit({ ...openEdit, PersonalProfileInput: false });
  };

  const saveName = () => {
    dispatch(updateUserProfile(name, "name"));
    setOpenEdit({ ...openEdit, nameEdit: false });
  };

  useEffect(() => {
    if (openEdit.PersonalProfileInput)
      setPersonalProfile(userProfile?.personalProfile);
  }, [openEdit.PersonalProfileInput, userProfile.personalProfile]);

  return (
    <Box className={classes.outerBox}>
      <Button
        className={classes.closeButton}
        onClick={() => setOuterEdit(false)}
      >
        <CloseIcon />
      </Button>

      <Box className={classes.eachBox}>
        <div className={classes.boxTop}>
          <Typography variant="h6" className={classes.fontBold}>
            大頭照
          </Typography>

          <label
            htmlFor="imageUpload2"
            className={`${classes.editLabel} ${classes.editButton} ${
              imageLoading && "disable"
            }`}
          >
            編輯
          </label>

          <input
            id="imageUpload2"
            className={classes.imageInput}
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Avatar
            src={
              userProfile?.avatar
                ? user.avatar
                : "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
            }
            className={classes.avatar}
          />
          {imageLoading && (
            <span className={classes.imageLoading}>
              <CircularProgress
                style={{ color: "gray", width: "25px", height: "25px" }}
              />
            </span>
          )}
        </div>
      </Box>

      <Box className={classes.eachBox}>
        <div className={classes.boxTop}>
          <Typography variant="h6" className={classes.fontBold}>
            姓名
          </Typography>
          {openEdit.nameEdit ? (
            <Button
              variant="contained"
              className={classes.editButton}
              onClick={() =>
                setOpenEdit(({ nameEdit }) => ({
                  ...openEdit,
                  nameEdit: !nameEdit,
                }))
              }
            >
              取消
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classes.editButton}
              onClick={() =>
                setOpenEdit(({ nameEdit }) => ({
                  ...openEdit,
                  nameEdit: !nameEdit,
                }))
              }
            >
              編輯
            </Button>
          )}
        </div>
        {!openEdit.nameEdit && (
          <div className={classes.nameBox}>
            <Typography variant="h6">{userProfile?.name}</Typography>
          </div>
        )}
        {openEdit.nameEdit && (
          <>
            <div className={classes.textfield}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                variant="outlined"
                color="primary"
                name="name"
                size="small"
                style={{ width: "100px" }}
              />
            </div>
            <div className={classes.saveButtonContainer}>
              <Button
                variant="contained"
                className={classes.editButton}
                onClick={saveName}
                disabled={name === userProfile?.name}
              >
                儲存
              </Button>
            </div>
          </>
        )}
      </Box>

      <Divider className={classes.divider} />

      <Box className={classes.eachBox}>
        <div className={classes.boxTop}>
          <Typography variant="h6" className={classes.fontBold}>
            個人簡介
          </Typography>
          {openEdit.PersonalProfileInput ? (
            <Button
              variant="contained"
              className={classes.editButton}
              onClick={() =>
                setOpenEdit(({ PersonalProfileInput }) => ({
                  ...openEdit,
                  PersonalProfileInput: !PersonalProfileInput,
                }))
              }
            >
              取消
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classes.editButton}
              onClick={() =>
                setOpenEdit(({ PersonalProfileInput }) => ({
                  ...openEdit,
                  PersonalProfileInput: !PersonalProfileInput,
                }))
              }
            >
              編輯
            </Button>
          )}
        </div>
        {!openEdit.PersonalProfileInput ? (
          !userProfile?.personalProfile ? (
            <div className={classes.personalProfile}>
              <Typography color="textSecondary" variant="body1">
                這裡寫下內容。。。
              </Typography>
            </div>
          ) : (
            <div className={classes.personalProfile}>
              <Typography color="textSecondary" variant="body1">
                {userProfile?.personalProfile}
              </Typography>
            </div>
          )
        ) : null}
        {openEdit.PersonalProfileInput && (
          <>
            <div className={classes.textfield}>
              <TextField
                value={personalProfile}
                onChange={(e) => setPersonalProfile(e.target.value)}
                variant="outlined"
                color="primary"
                label="請寫下內容"
                name="personalProfile"
                size="small"
                rows="3"
                multiline
                style={{ width: "55%" }}
              />
            </div>
            <div className={classes.saveButtonContainer}>
              <Button
                variant="contained"
                className={classes.editButton}
                onClick={saveProfile}
                disabled={personalProfile === userProfile?.personalProfile}
              >
                儲存
              </Button>
            </div>
          </>
        )}
      </Box>

      <Divider className={classes.divider} />

      <Box className={classes.eachBox}>
        <div className={classes.boxTop}>
          <Typography variant="h6" className={classes.fontBold}>
            自訂簡介
          </Typography>
          <Button
            variant="contained"
            className={classes.editButton}
            onClick={() => setOpenEdit({ ...openEdit, DetailsDialog: true })}
          >
            編輯
          </Button>
        </div>
        <ProfileDetailList />
      </Box>

      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          to={{ pathname: "/auth", state: { changePassword: true } }}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" className={classes.editButton}>
            更改密碼
          </Button>
        </Link>
      </Box>
      <Dialog
        open={openEdit.DetailsDialog}
        onClose={() => setOpenEdit({ ...openEdit, DetailsDialog: false })}
        maxWidth="sm"
        fullWidth
      >
        <DetailsProfile setOpenEdit={setOpenEdit} />
      </Dialog>
    </Box>
  );
};

export default EditProfile;
