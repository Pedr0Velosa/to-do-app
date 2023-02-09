import OutlinedInput from "@/components/Input/OutlinedInput";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

const EmailController = ({
  control,
}: {
  control: Control<ISignUpForm, any>;
}) => {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <>
          <OutlinedInput
            field={field}
            label="Email Address"
            id="email"
            required={true}
            type="email"
            margin="none"
            fullWidth={true}
          />
        </>
      )}
    />
  );
};

export default EmailController;
