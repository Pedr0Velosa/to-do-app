import OutlinedInput from "@/components/Input/OutlinedInput";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

type EmailControllerProps = {
  control: Control<ISignUpForm, any>;
  error: boolean;
};

const EmailController = ({ control, error }: EmailControllerProps) => {
  return (
    <Controller
      name="email"
      control={control}
      rules={{ required: "Digit email" }}
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
            error={error}
          />
        </>
      )}
    />
  );
};

export default EmailController;
