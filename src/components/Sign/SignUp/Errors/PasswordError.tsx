import { Typography } from "@mui/material";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

const PasswordError = ({ errors }: { errors: FieldErrors<ISignUpForm> }) => {
  return (
    <>
      {errors.password && (
        <Typography component={"span"} variant="subtitle2" color={"error"}>
          {errors.password.message}
        </Typography>
      )}
    </>
  );
};

export default PasswordError;
