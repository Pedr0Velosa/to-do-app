import OutlinedInput from "@/components/Input/OutlinedInput";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

type FirstNameControllerProps = {
  control: Control<ISignUpForm, any>;
  error: boolean;
};

const FirstNameController = ({ control, error }: FirstNameControllerProps) => {
  return (
    <Controller
      name="firstName"
      control={control}
      rules={{ required: "Digit first name" }}
      render={({ field }) => (
        <>
          <OutlinedInput
            field={field}
            label="First Name"
            id="first-name"
            required={true}
            margin="none"
            fullWidth={false}
            error={error}
          />
        </>
      )}
    />
  );
};

export default FirstNameController;
