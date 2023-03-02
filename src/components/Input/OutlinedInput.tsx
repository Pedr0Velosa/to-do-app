import { FormControl, InputLabel } from "@mui/material";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type OutlinedInputProps = {
  field: ControllerRenderProps<any, any>;
  id: string;
  label: string;
  type?: "text" | "password" | "email";
  required?: boolean;
  margin: "dense" | "normal" | "none";
  fullWidth: boolean;
  endAdornment?: JSX.Element;
  error?: boolean;
};

const OutlinedInput = ({
  field,
  id,
  type = "text",
  label,
  required = false,
  margin,
  fullWidth,
  endAdornment,
  error = false,
  ...rest
}: OutlinedInputProps) => {
  return (
    <>
      <FormControl variant="outlined" fullWidth={fullWidth} required={required} margin={margin}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <MuiOutlinedInput
          id={id}
          type={type}
          {...field}
          label={label}
          endAdornment={endAdornment}
          error={error}
          {...rest}
        />
      </FormControl>
    </>
  );
};

export default OutlinedInput;
