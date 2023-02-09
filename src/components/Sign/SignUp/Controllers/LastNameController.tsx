import OutlinedInput from "@/components/Input/OutlinedInput";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { ISignUpForm } from "../SignUp";

const LastNameController = ({
  control,
}: {
  control: Control<ISignUpForm, any>;
}) => {
  return (
    <Controller
      name="lastName"
      control={control}
      render={({ field }) => (
        <>
          <OutlinedInput
            field={field}
            label="Last Name"
            id="lastName"
            required={true}
            margin="none"
            fullWidth={false}
          />
        </>
      )}
    />
  );
};

export default LastNameController;
