import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ISignInForm } from "./SignIn";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordInputProps = {
  field: ControllerRenderProps<ISignInForm, "password">;
};

const PasswordInput = ({ field }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleMouseDownPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          {...field}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </>
  );
};

export default PasswordInput;
