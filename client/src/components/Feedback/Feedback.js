import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import useStyle from "./styles";
import { Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { ERROR_CLEAN, FEEDBACK_CLEAN } from "../../constants/actionTypes";

const Feedback = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { feedback, error } = useSelector((state) => state.status);
  const feedbackClose = (id) => {
    dispatch({ type: FEEDBACK_CLEAN, payload: id });
  };

  const errorClose = (id) => {
    dispatch({ type: ERROR_CLEAN, payload: id });
  };

  return (
    <Box sx={{ position: "absolute", top: "88px", right: "50px", zIndex: 100 }}>
      {feedback.map((f) => (
        <Alert
          key={f.id}
          className={classes.alert}
          variant="filled"
          severity="success"
          onAnimationEnd={() => feedbackClose(f.id)}
        >
          {f.content}
        </Alert>
      ))}
      {error.map((error) => (
        <Alert
          key={error.id}
          className={classes.alert}
          variant="filled"
          severity="error"
          onAnimationEnd={() => errorClose(error.id)}
        >
          {error.content}
        </Alert>
      ))}
    </Box>
  );
};

export default memo(Feedback);
