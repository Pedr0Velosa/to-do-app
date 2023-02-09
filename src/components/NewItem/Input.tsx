import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import axios from "axios";
import addNotification from "@libs/toast/addNotification";
import { Typography } from "@mui/material";
import type { INewItemForm } from "./Controller";
import type {
  ControllerRenderProps,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

type InputProps = {
  field: ControllerRenderProps<INewItemForm, "title">;
  handleSubmit: UseFormHandleSubmit<INewItemForm>;
  errors: FieldErrors<INewItemForm>;
  onClick: (data: INewItemForm) => void;
};

const Input = ({ field, handleSubmit, errors, onClick }: InputProps) => {
  return (
    <Box sx={{ mt: 6, maxWidth: "60ch", width: "100%" }}>
      <FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="new-item">New To Do</InputLabel>
        <FilledInput
          id="new-item"
          type={"text"}
          placeholder="Create a New To Do"
          error={!!errors.title}
          {...field}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="create to do"
                onClick={handleSubmit(onClick)}
                edge="end"
              >
                <NoteAddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.title && (
          <Typography color={"error"} component={"p"} variant="subtitle1">
            {errors.title.message}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default Input;
