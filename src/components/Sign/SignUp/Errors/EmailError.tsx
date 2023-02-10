import { Typography } from "@mui/material";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

const EmailError = ({ errors }: { errors: FieldErrors<ISignUpForm> }) => {
  return (
    <>
      {errors.email && (
        <Typography component={"span"} variant="subtitle2" color={"error"}>
          {errors.email.message}
        </Typography>
      )}
    </>
  );
};

export default EmailError;
