import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import useStyle from "./styles";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Slide,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Input from "./input";
import { signup, signin, changePassword } from "../../actions/auth";
import { OPEN_SIDEBAR } from "../../constants/actionTypes";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const changePasswordForm = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("請輸入姓名"),
  email: Yup.string().email("請輸入正確email").required("請輸入email"),
  password: Yup.string().min(6, "密碼最少6個字元").required("請輸入密碼"),
  confirmpassword: Yup.string().when("password", (password, schema) => {
    return password
      ? schema.oneOf([password], "密碼需一致").required("請再次輸入密碼")
      : schema;
  }),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("請輸入正確email").required("請輸入email"),
  password: Yup.string().required("請輸入密碼"),
});

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("請輸入舊密碼"),
  newPassword: Yup.string().min(6, "密碼最少6個字元").required("請輸入新密碼"),
  confirmNewPassword: Yup.string().when("newPassword", (password, schema) => {
    return password
      ? schema.oneOf([password], "密碼需一致").required("請再次輸入新密碼")
      : schema;
  }),
});

const Auth = ({ SignUp = false }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const unmount = useRef(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmpassword: false,
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [isSignup, setisSignup] = useState(SignUp);
  const [loading, setLoading] = useState(false);
  const { myData: user } = useSelector((state) => state.auth);
  const isChangePassword = location?.state?.changePassword || false;

  const handleShowPassword = (type) => {
    setShowPassword((pre) => ({ ...pre, [type]: !pre[type] }));
  };

  const switchMode = () => {
    setisSignup((pre) => !pre);
    setShowPassword({
      password: false,
      confirmpassword: false,
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: isChangePassword ? changePasswordForm : initialFormState,
    validationSchema: isChangePassword
      ? ChangePasswordSchema
      : isSignup
      ? RegisterSchema
      : LoginSchema,
    onSubmit: async (value, { resetForm }) => {
      setLoading(true);
      if (isChangePassword) {
        await dispatch(changePassword(value, navigate));
        resetForm();
      } else {
        if (isSignup) {
          await dispatch(signup(value, navigate));
        } else {
          await dispatch(signin(value, navigate));
        }
      }
      if (!unmount.current) setLoading(false);
    },
  });

  useEffect(() => {
    return () => {
      unmount.current = true;
    };
  }, []);

  if ((user && !isChangePassword) || (!user && isChangePassword))
    return <Navigate to="/posts" />;

  return (
    <Slide in unmountOnExit mountOnEnter direction="left">
      <div className={classes.background}>
        <Button
          className={classes.sidebarMenu}
          onClick={() => dispatch({ type: OPEN_SIDEBAR })}
        >
          <MenuIcon fontSize="large" />
        </Button>
        <Paper className={classes.paper} elevation={5}>
          <Typography variant="h5" className={classes.title}>
            {isChangePassword ? "更改密碼" : isSignup ? "註冊" : "登入"}
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              {isSignup && (
                <Input name="name" label="姓名" type="text" formik={formik} />
              )}
              {!isChangePassword && (
                <>
                  <Input
                    name="email"
                    label="電子郵件"
                    type="email"
                    formik={formik}
                  />
                  <Input
                    name="password"
                    label="密碼"
                    type={showPassword.password ? "text" : "password"}
                    handleShowPassword={() => handleShowPassword("password")}
                    formik={formik}
                  />
                </>
              )}
              {isSignup && (
                <Input
                  name="confirmpassword"
                  label="確認密碼"
                  type={showPassword.confirmpassword ? "text" : "password"}
                  handleShowPassword={() =>
                    handleShowPassword("confirmpassword")
                  }
                  formik={formik}
                />
              )}
              {isChangePassword && (
                <>
                  <Input
                    name="oldPassword"
                    label="舊密碼"
                    type={showPassword.oldPassword ? "text" : "password"}
                    handleShowPassword={() => handleShowPassword("oldPassword")}
                    formik={formik}
                  />
                  <Input
                    name="newPassword"
                    label="新密碼"
                    type={showPassword.newPassword ? "text" : "password"}
                    handleShowPassword={() => handleShowPassword("newPassword")}
                    formik={formik}
                  />
                  <Input
                    name="confirmNewPassword"
                    label="確定新密碼"
                    type={showPassword.confirmNewPassword ? "text" : "password"}
                    handleShowPassword={() =>
                      handleShowPassword("confirmNewPassword")
                    }
                    formik={formik}
                  />
                </>
              )}
            </Grid>
            <Box sx={{ position: "relative" }}>
              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading ? true : false}
                fullWidth
              >
                {isChangePassword ? "確認" : isSignup ? "註冊" : "登入"}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  style={{
                    position: "absolute",
                    left: "20%",
                    top: "38%",
                    color: "gray",
                  }}
                />
              )}
            </Box>
          </form>
          {!isChangePassword && (
            <>
              <div
                style={{ width: "100%", borderTop: "1px solid black" }}
              ></div>
              <Button
                className={classes.Button}
                onClick={switchMode}
                fullWidth
                variant="outlined"
                color="primary"
                disabled={loading ? true : false}
              >
                {isSignup ? "使用現有帳號登入" : "註冊新帳號"}
              </Button>
            </>
          )}
        </Paper>
      </div>
    </Slide>
  );
};

export default Auth;
