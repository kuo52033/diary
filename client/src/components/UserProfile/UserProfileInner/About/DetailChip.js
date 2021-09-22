import React, { useState } from "react";

import useStyle from "./styles";
import { Typography, Button, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const DetailChip = ({ content, handleDelete, type, idx }) => {
  const classes = useStyle();
  const [openDeleteCheck, setOpenDeleteCheck] = useState(false);
  const clickDelete = () => {
    handleDelete(type, idx);
    setOpenDeleteCheck(false);
  };

  return (
    <div className={classes.chipContainer}>
      <div className={classes.eachChip}>
        <Typography>{content}</Typography>
      </div>
      {openDeleteCheck ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography color="textSecondary" className={classes.marginRight}>
            確定要刪除嗎?
          </Typography>
          <Button
            variant="contained"
            className={`${classes.editButton} ${classes.marginRight}`}
            onClick={() => setOpenDeleteCheck(false)}
          >
            取消
          </Button>
          <Button
            variant="contained"
            className={classes.editButton}
            onClick={clickDelete}
          >
            確定
          </Button>
        </div>
      ) : (
        <Tooltip title="刪除" placement="top">
          <div
            className={classes.deleteButton}
            onClick={() => setOpenDeleteCheck(true)}
          >
            <DeleteIcon />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default React.memo(DetailChip);
