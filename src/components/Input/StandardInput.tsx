import { FormControl } from "@mui/material";
import Input from "@mui/material/Input";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type StandardInputProps = {
  field: ControllerRenderProps<any, any>;
  id: string;
  margin: "dense" | "normal" | "none";
  fullWidth: boolean;
  type?: "text" | "password" | "email";
  required?: boolean;
  endAdornment?: JSX.Element;
  error?: boolean;
};

const StandardInput = ({
  field,
  id,
  type = "text",
  required = false,
  margin,
  fullWidth,
  endAdornment,
  error = false,
  ...rest
}: StandardInputProps) => {
  return (
    <>
      <FormControl variant="outlined" fullWidth={fullWidth} required={required} margin={margin}>
        <Input id={id} type={type} {...field} endAdornment={endAdornment} error={error} {...rest} />
      </FormControl>
    </>
  );
};

export default StandardInput;
