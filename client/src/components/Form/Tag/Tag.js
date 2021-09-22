import React, { useState, useEffect } from "react";
import useStyle from "./styles";
import { IconButton, Tooltip, InputBase, Chip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const Tag = ({ openTag, postData, setPostData, handleDeleteTag }) => {
  const classes = useStyle();
  const [tagInput, setTagInput] = useState("");
  const [inputControl, setInputControl] = useState(true);
  const [tagError, setTagError] = useState(false);
  const [tagErrorAnimation, setTagErrorAnimation] = useState(false);

  const handleChangeTag = (e) => {
    setTagInput(e.target.value);
    setTagError(false);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      if (e.target.name === "tags") addTag();
      return;
    }
  };

  const addTag = () => {
    if (!tagInput) return;
    setPostData({
      ...postData,
      tags: [...postData.tags, tagInput],
    });
    setTagInput("");
    setInputControl(false);
    setTagError(false);
  };

  const addTagInput = () => {
    if (inputControl) {
      if (tagInput) {
        setPostData({
          ...postData,
          tags: [...postData.tags, tagInput],
        });
        setTagInput("");
        setTagError(false);
      } else {
        setTagErrorAnimation(true);
        setTagError(true);
        return;
      }
    }
    setInputControl(true);
    setTagError(false);
    setTagInput("");
  };

  useEffect(() => {
    if (openTag) setTagError(false);
  }, [openTag]);

  return (
    <div className={classes.container}>
      {postData.tags?.map((tag, idx) => (
        <Chip
          key={idx}
          variant="outlined"
          label={tag}
          size="medium"
          color="primary"
          onDelete={() => handleDeleteTag(idx)}
          style={{ margin: "3px 3px" }}
        />
      ))}
      {inputControl && (
        <InputBase
          name="tags"
          className={
            tagErrorAnimation ? `${classes.textfield} error` : classes.textfield
          }
          value={tagInput}
          onAnimationEnd={() => setTagErrorAnimation(false)}
          onChange={(e) => handleChangeTag(e)}
          onKeyPress={(e) => handleTagInputKeyPress(e)}
          error={tagError}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton
          //       className={classes.closeButton}
          //       onClick={() => removeTagInput()}
          //     >
          //       <CancelIcon className={classes.closeButton} />
          //     </IconButton>
          //   </InputAdornment>
          // }
        ></InputBase>
      )}
      <Tooltip title="新增標籤" placement="top">
        <IconButton
          onClick={addTagInput}
          style={{
            border: "1px solid lightgray",
            width: "25px",
            height: "25px",
            marginLeft: "6px",
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Tag;
