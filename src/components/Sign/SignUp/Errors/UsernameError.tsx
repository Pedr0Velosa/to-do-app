import { Typography } from "@mui/material";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

const UsernameError = ({ errors }: { errors: FieldErrors<ISignUpForm> }) => {
  return (
    <>
      {errors.firstName && errors.lastName ? (
        <Typography component={"span"} variant="subtitle2" color={"error"}>
          Enter first and last name
        </Typography>
      ) : errors.firstName ? (
        <Typography component={"span"} variant="subtitle2" color={"error"}>
          {errors.firstName.message}
        </Typography>
      ) : errors.lastName ? (
        <Typography component={"span"} variant="subtitle2" color={"error"}>
          {errors.lastName?.message}
        </Typography>
      ) : null}
    </>
  );
};

export default UsernameError;
