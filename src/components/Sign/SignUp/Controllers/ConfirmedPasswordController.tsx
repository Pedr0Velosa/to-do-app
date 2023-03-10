import React, { useState } from "react";
import OutlinedInput from "@/components/Input/OutlinedInput";
import { Control, Controller } from "react-hook-form";
import { ISignUpForm } from "../SignUp";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type ConfirmedPasswordControllerProps = {
  control: Control<ISignUpForm, any>;
  error: boolean;
};

const ConfirmedPasswordController = ({
  control,
  error,
}: ConfirmedPasswordControllerProps) => {
  const [showConfirmedPassword, setShowConfirmedPassword] =
    useState<boolean>(false);

  const toogleConfirmedPassword = () =>
    setShowConfirmedPassword(!showConfirmedPassword);

  return (
    <Controller
      name="confirmed-password"
      control={control}
      render={({ field }) => (
        <>
          <OutlinedInput
            field={field}
            label="Confirmed Password"
            id="confirmed-password"
            required={true}
            type={showConfirmedPassword ? "text" : "password"}
            margin="none"
            fullWidth={true}
            error={error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirmed password visibility"
                  onClick={toogleConfirmedPassword}
                  onMouseDown={toogleConfirmedPassword}
                  edge="end"
                >
                  {showConfirmedPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </>
      )}
    />
  );
};

export default ConfirmedPasswordController;
