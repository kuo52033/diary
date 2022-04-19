import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import useStyle from "./styles";
import { Box, Button, Divider, Typography, TextField } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import DetailChip from "./DetailChip";
import { updateUserProfile } from "../../../../actions/auth";

const DetailsProfile = ({ setOpenEdit }) => {
  const classes = useStyle();
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectedDate, handleDateChange] = useState(
    userProfile.birthDate || new Date()
  );
  const [openProfileInput, setOpenProfileInput] = useState({
    education: false,
    workExperience: false,
  });
  const [profileInput, setProfileInput] = useState({
    education: "",
    workExperience: "",
  });

  const handleSaveInput = (type) => {
    dispatch(
      updateUserProfile([...userProfile[type], profileInput[type]], type)
    );
    setOpenProfileInput({ ...openProfileInput, [type]: false });
    setProfileInput({ ...profileInput, [type]: "" });
  };

  const handleSaveBirthDate = () => {
    dispatch(updateUserProfile(selectedDate, "birthDate"));
  };

  const handleDeleteChip = useCallback(
    (type, filterIdx) => {
      dispatch(
        updateUserProfile(
          userProfile[type].filter((each, idx) => idx !== filterIdx),
          type
        )
      );
    },
    [userProfile, dispatch]
  );
  // console.log("selectedDate:", selectedDate);
  // console.log("userBirthDay", userBirthday);
  return (
    <Box className={classes.outerBox}>
      <Button
        className={classes.backButton}
        onClick={() => setOpenEdit({ DetailsDialog: false })}
      >
        <ArrowBackIcon />
      </Button>
      <Typography variant="h6" align="center" className={classes.fontBold}>
        編輯詳細資料
      </Typography>
      <Divider className={classes.divider} />
      <Box className={classes.eachDetailBox}>
        <Typography variant="subtitle1">出生日</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            disableFuture
            openTo="year"
            format="yyyy/MM/dd"
            autoOk
            inputVariant="outlined"
            variant="inline"
            views={["year", "month", "date"]}
            value={selectedDate}
            onChange={handleDateChange}
            style={{ width: "25%" }}
          />
          <Button
            variant="contained"
            className={classes.editButton}
            onClick={handleSaveBirthDate}
            style={{ marginTop: "10px", width: "14%" }}
            disabled={
              userProfile.birthDate
                ? moment(selectedDate).format("yyyy/MM/DD") ===
                  moment(userProfile.birthDate).format("yyyy/MM/DD")
                : false
            }
          >
            儲存
          </Button>
        </MuiPickersUtilsProvider>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.eachDetailBox}>
        <Typography variant="subtitle1">學歷</Typography>
        <Box sx={{ margin: "8px 0px" }}>
          {userProfile?.education.length === 0 && (
            <Typography color="textSecondary">無</Typography>
          )}
          {userProfile?.education.map((edu, idx) => (
            <DetailChip
              key={idx}
              idx={idx}
              content={edu}
              type="education"
              handleDelete={handleDeleteChip}
            />
          ))}
        </Box>
        {openProfileInput.education ? (
          <>
            <div className={classes.textfield}>
              <TextField
                value={profileInput.education}
                onChange={(e) =>
                  setProfileInput({
                    ...profileInput,
                    education: e.target.value,
                  })
                }
                label="學校名稱"
                name="schoolName"
                variant="outlined"
                color="primary"
                size="small"
                style={{ width: "50%", alignSelf: "center" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignSelf: "center",
                width: "50%",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                className={classes.editButton}
                onClick={() =>
                  setOpenProfileInput({ ...openProfileInput, education: false })
                }
              >
                取消
              </Button>
              <Button
                variant="contained"
                className={classes.editButton}
                onClick={() => handleSaveInput("education")}
                disabled={!profileInput.education}
                style={{ marginLeft: "7px" }}
              >
                儲存
              </Button>
            </div>
          </>
        ) : (
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              setOpenProfileInput({ ...openProfileInput, education: true })
            }
            style={{ width: "150px" }}
          >
            新增學歷
          </Button>
        )}
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.eachDetailBox}>
        <Typography variant="subtitle1">工作經歷</Typography>
        <Box sx={{ margin: "8px 0px" }}>
          {userProfile?.workExperience.length === 0 && (
            <Typography color="textSecondary">無</Typography>
          )}
          {userProfile?.workExperience.map((work, idx) => (
            <DetailChip
              key={idx}
              idx={idx}
              content={work}
              type="workExperience"
              handleDelete={handleDeleteChip}
            />
          ))}
        </Box>
        {openProfileInput.workExperience ? (
          <>
            <div className={classes.textfield}>
              <TextField
                value={profileInput.workExperience}
                onChange={(e) =>
                  setProfileInput({
                    ...profileInput,
                    workExperience: e.target.value,
                  })
                }
                label="公司名稱"
                name="schoolName"
                variant="outlined"
                color="primary"
                size="small"
                style={{ width: "50%", alignSelf: "center" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignSelf: "center",
                width: "50%",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                className={classes.editButton}
                onClick={() =>
                  setOpenProfileInput({
                    ...openProfileInput,
                    workExperience: false,
                  })
                }
              >
                取消
              </Button>
              <Button
                variant="contained"
                className={classes.editButton}
                onClick={() => handleSaveInput("workExperience")}
                disabled={!profileInput.workExperience}
                style={{ marginLeft: "7px" }}
              >
                儲存
              </Button>
            </div>
          </>
        ) : (
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              setOpenProfileInput({ ...openProfileInput, workExperience: true })
            }
            style={{ width: "150px" }}
          >
            新增工作經歷
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DetailsProfile;
