import OutlinedInput from "@/components/Input/OutlinedInput";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

const FirstNameController = ({
  control,
}: {
  control: Control<ISignUpForm, any>;
}) => {
  return (
    <Controller
      name="firstName"
      control={control}
      render={({ field }) => (
        <>
          <OutlinedInput
            field={field}
            label="First Name"
            id="first-name"
            required={true}
            margin="none"
            fullWidth={false}
          />
        </>
      )}
    />
  );
};

export default FirstNameController;
