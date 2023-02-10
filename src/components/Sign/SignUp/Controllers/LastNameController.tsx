import OutlinedInput from "@/components/Input/OutlinedInput";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

type LastNameControllerProps = {
  control: Control<ISignUpForm, any>;
  error: boolean;
};

const LastNameController = ({ control, error }: LastNameControllerProps) => {
  return (
    <Controller
      name="lastName"
      control={control}
      rules={{ required: "Digit last name" }}
      render={({ field }) => (
        <>
          <OutlinedInput
            field={field}
            label="Last Name"
            id="lastName"
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

export default LastNameController;
