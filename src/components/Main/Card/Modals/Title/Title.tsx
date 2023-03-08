import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import StandardInput from "@/components/Input/StandardInput";
import { ControllerRenderProps, UseFormSetValue } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import { useFormType } from "../CardInfo";

type TitleProps = {
  field: ControllerRenderProps<any, any>;
  setValue: UseFormSetValue<useFormType>;
};

const Title = ({ field, setValue }: TitleProps) => {
  const handleOnClick = () => {
    setValue("title", "");
  };

  return (
    <StandardInput
      field={field}
      id="todo-title"
      fullWidth={true}
      margin="normal"
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="clear title" onClick={handleOnClick}>
            <CloseIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default Title;
