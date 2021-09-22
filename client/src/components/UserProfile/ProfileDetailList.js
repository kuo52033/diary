import { useSelector } from "react-redux";

import useStyle from "./styles";
import { Typography } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";

const ProfileDetailList = () => {
  const classes = useStyle();
  const { userProfile } = useSelector((state) => state.auth);
  return (
    <>
      <div className={classes.eachDetail}>
        {!userProfile?.birthDate ? (
          <>
            <DateRangeIcon color="disabled" />
            <Typography color="textSecondary" className={classes.mgl}>
              未編輯
            </Typography>
          </>
        ) : (
          <>
            <DateRangeIcon />
            <Typography className={classes.mgl}>
              出生日 : {new Date(userProfile.birthDate).toLocaleDateString()}
            </Typography>
          </>
        )}
      </div>
      {userProfile?.education.length === 0 ? (
        <div className={classes.eachDetail}>
          <SchoolIcon color="disabled" />
          <Typography color="textSecondary" className={classes.mgl}>
            無學歷
          </Typography>
        </div>
      ) : (
        userProfile?.education.map((edu, idx) => (
          <div key={idx} className={classes.eachDetail}>
            <SchoolIcon />
            <Typography className={classes.mgl}>曾就讀於{edu}</Typography>
          </div>
        ))
      )}
      {userProfile?.workExperience.length === 0 ? (
        <div className={classes.eachDetail}>
          <WorkIcon color="disabled" />
          <Typography color="textSecondary" className={classes.mgl}>
            無工作經歷
          </Typography>
        </div>
      ) : (
        userProfile?.workExperience.map((work, idx) => (
          <div key={idx} className={classes.eachDetail}>
            <WorkIcon />
            <Typography className={classes.mgl}>工作於{work}</Typography>
          </div>
        ))
      )}
    </>
  );
};

export default ProfileDetailList;
