import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyle from "./styles";
import {
  Box,
  Button,
  Paper,
  CircularProgress,
  ImageListItem,
  ImageList,
  Typography,
  TextField,
  Tooltip,
} from "@material-ui/core";
import QueueIcon from "@material-ui/icons/Queue";
import PhotoIcon from "@material-ui/icons/Photo";
import CancelIcon from "@material-ui/icons/Cancel";

import { createPost, updatePost } from "../../actions/posts";
import imageCompression from "browser-image-compression";
import { baseURL } from "../../api";
import Tag from "./Tag/Tag";
import {
  CLEAN_FORMDATA,
  SET_FORMDATA,
  CLOSE_EDIT_POST,
} from "../../constants/actionTypes";

const Form = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const dataRef = useRef({});
  const unmount = useRef(false);

  const { formPostData, post } = useSelector((state) => state.posts.editPost);
  const [postData, setPostData] = useState(post || formPostData);

  const [openTag, setOpenTag] = useState(
    postData.tags.length !== 0 ? true : false
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const ispost = useRef(Boolean(post));

  const handleSubbmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (postData.sendFile)
      postData.sendFile.forEach((image) => formData.append("file", image));
    postData.selectfile.forEach((image) =>
      formData.append("beforeFile", image)
    );

    formData.append("title", postData.title);
    formData.append("message", postData.message);
    postData.tags.forEach((tag) => formData.append("tags", tag));

    setSubmitLoading(true);
    if (post) {
      await dispatch(updatePost(post._id, formData, history));
    } else {
      await dispatch(createPost(formData, history));
    }
    dispatch({ type: CLOSE_EDIT_POST });
    if (!unmount.current) {
      clear();
      setSubmitLoading(false);
    } else {
      dispatch({ type: CLEAN_FORMDATA });
    }
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectfile: [],
      sendFile: [],
    });
  };

  const handleDeleteTag = (filterTagIdx) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag, idx) => idx !== filterTagIdx),
    });
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      return;
    }
  };

  const fileAsync = async (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const handleImage = async (e) => {
    const images = e.currentTarget.files;
    const imagesArray = [...images];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const filterArray = imagesArray.filter((image) => {
      return image.type.match(/image.*/);
    });

    setImageLoading(true);
    const result = await Promise.all(
      filterArray.map(async (image) => {
        const compress = await imageCompression(image, options);
        const base64 = await fileAsync(compress);
        return base64;
      })
    );
    if (!unmount.current) {
      setImageLoading(false);

      setPostData({
        ...postData,
        selectfile: [...result],
        sendFile: [...filterArray],
      });
    }
  };

  const handleDeleteImage = () => {
    setPostData({ ...postData, selectfile: [], sendFile: [] });
  };

  const renderSelectfile = () => {
    const render = [];
    for (let [idx, file] of postData.selectfile.entries()) {
      if (idx === 4 || !file) break;

      render.push(
        <ImageListItem
          key={idx}
          cols={
            (idx === 0 && postData.selectfile.length < 4) ||
            postData.selectfile.length === 2
              ? 2
              : 1
          }
        >
          <img
            src={
              file.split(",")[0].match("base64")
                ? file
                : `${baseURL}/static/postImage/${file}`
            }
            alt=""
          />
        </ImageListItem>
      );
    }

    return render;
  };

  useEffect(() => {
    dataRef.current = postData;
  }, [postData]);

  useEffect(() => {
    let ispostVariable = ispost.current;
    return () => {
      unmount.current = true;
      if (!ispostVariable)
        dispatch({ type: SET_FORMDATA, payload: dataRef.current });
    };
  }, [dispatch]);

  return (
    <Paper className={`${classes.paper} ${classes.root}`}>
      <form
        onSubmit={handleSubbmit}
        autoComplete="off"
        className={classes.form}
      >
        <Typography variant="h5">{post ? "編輯" : "新增"}貼文</Typography>
        <TextField
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          label="標題"
          name="title"
          variant="outlined"
          size="small"
          fullWidth
          required
          onKeyPress={handleKeyPress}
        />
        <textarea
          className={classes.textarea}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          // label="內文"
          name="messages"
          placeholder="內文 *"
          // variant="outlined"
          // type="message"
          rows="7"
          // multiline
          // fullWidth
          required
        />

        <Box
          sx={{
            display: "flex",
            width: "70%",
            alignItems: "center",
            justifyContent: "space-around",
            border: "solid 1px lightgray",
            marginTop: "15px",
            marginBottom: openTag ? "0px" : "23px",
            padding: "5px 0px",
          }}
        >
          <Typography variant="h6">新增以下到貼文</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="標籤" placement="top">
              <div
                className={classes.imageButton}
                onClick={() => setOpenTag((pre) => !pre)}
              >
                <QueueIcon />
              </div>
            </Tooltip>
            <Tooltip title="照片" placement="top">
              <label className={classes.imageButton} htmlFor="imageUpload">
                <PhotoIcon />
              </label>
            </Tooltip>
          </Box>
        </Box>

        {openTag && (
          <Tag
            openTag={openTag}
            postData={postData}
            setPostData={setPostData}
            handleDeleteTag={handleDeleteTag}
          />
        )}

        <input
          id="imageUpload"
          className={classes.imageInput}
          type="file"
          accept="image/*"
          onChange={(e) => handleImage(e)}
          multiple
        />

        {imageLoading && (
          <div
            style={{
              width: "100%",
              height: "150px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <CircularProgress style={{ color: "gray" }} />
          </div>
        )}

        {postData.selectfile.length !== 0 && (
          <div className={classes.imageContainer}>
            <ImageList
              className={classes.imageList}
              rowHeight={160}
              cols={2}
              gap={1}
            >
              {renderSelectfile()}
            </ImageList>
            <span className={classes.imageAction}>
              <Tooltip title="移除相片" placement="top">
                <div
                  className={classes.closeButton}
                  onClick={handleDeleteImage}
                >
                  <CancelIcon />
                </div>
              </Tooltip>
            </span>
            {postData.selectfile.length > 4 && (
              <Typography
                variant="h4"
                color="primary"
                className={classes.morePhoto}
              >
                +{postData.selectfile.length - 3}
              </Typography>
            )}
          </div>
        )}

        <div className={classes.button}>
          <Button type="submit" color="primary" variant="contained">
            {post ? "儲存" : "發佈"}
          </Button>
          <Button color="secondary" variant="contained" onClick={clear}>
            清空
          </Button>
        </div>
      </form>
      {submitLoading && <CircularProgress className={classes.circular} />}
    </Paper>
  );
};

export default Form;
