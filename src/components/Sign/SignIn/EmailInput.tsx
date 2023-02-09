import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ISignInForm } from "./SignIn";

const EmailInput = ({
  field,
}: {
  field: ControllerRenderProps<ISignInForm, "email">;
}) => {
  return (
    <>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput id="email" type={"text"} {...field} label="Email" />
      </FormControl>
    </>
  );
};

export default EmailInput;
