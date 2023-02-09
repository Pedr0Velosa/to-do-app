import OutlinedInput from "@/components/Input/OutlinedInput";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { ISignInForm } from "../SignIn";

const EmailController = ({
  control,
}: {
  control: Control<ISignInForm, any>;
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
            required={false}
            type="email"
            margin="normal"
            fullWidth={true}
          />
        </>
      )}
    />
  );
};

export default EmailController;
