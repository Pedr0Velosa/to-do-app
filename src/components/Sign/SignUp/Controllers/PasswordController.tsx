import React, { useState } from "react";
import OutlinedInput from "@/components/Input/OutlinedInput";
import { Control, Controller } from "react-hook-form";
import { ISignUpForm } from "../SignUp";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordControllerProps = {
  control: Control<ISignUpForm, any>;
  error: boolean;
};

const PasswordController = ({ control, error }: PasswordControllerProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const tooglePassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name="password"
      control={control}
      rules={{ required: "Invalid password" }}
      render={({ field }) => (
        <>
          <OutlinedInput
            field={field}
            label="Password"
            id="password"
            required={true}
            type={showPassword ? "text" : "password"}
            margin="none"
            fullWidth={true}
            error={error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={tooglePassword}
                  onMouseDown={tooglePassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </>
      )}
    />
  );
};

export default PasswordController;
