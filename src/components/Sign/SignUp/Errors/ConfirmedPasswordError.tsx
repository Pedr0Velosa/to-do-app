import { Typography } from "@mui/material";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

const ConfirmedPasswordError = ({
  errors,
}: {
  errors: FieldErrors<ISignUpForm>;
}) => {
  return (
    <>
      {errors["confirmed-password"] && (
        <Typography component={"span"} variant="subtitle2" color={"error"}>
          {errors["confirmed-password"].message}
        </Typography>
      )}
    </>
  );
};

export default ConfirmedPasswordError;
