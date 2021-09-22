import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const input = ({ name, label, type, handleShowPassword, formik }) => {
  const { errors, touched, getFieldProps } = formik;

  return (
    <Grid item xs={12}>
      <TextField
        name={name}
        label={label}
        type={type}
        color="primary"
        variant="filled"
        fullWidth
        required
        {...getFieldProps(name)}
        error={Boolean(touched[name] && errors[name])}
        helperText={errors[name]}
        InputProps={
          name === "password" ||
          name === "confirmpassword" ||
          name === "oldPassword" ||
          name === "newPassword" ||
          name === "confirmNewPassword"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default input;
