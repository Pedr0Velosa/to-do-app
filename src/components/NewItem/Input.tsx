import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Typography } from "@mui/material";
import type { INewItemForm } from "./Controller";
import type { ControllerRenderProps, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { UseMutationResult } from "react-query";

type InputProps = {
  field: ControllerRenderProps<INewItemForm, "title">;
  handleSubmit: UseFormHandleSubmit<INewItemForm>;
  errors: FieldErrors<INewItemForm>;
  createToDo: ({ title }: { title: string }) => void;
};

const Input = ({ field, handleSubmit, errors, createToDo }: InputProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ mt: 6, maxWidth: "60ch", width: "100%" }} component={"form"} onSubmit={handleSubmit(createToDo)}>
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
                <IconButton aria-label="create to do" onClick={handleSubmit(createToDo)} edge="end">
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
    </Box>
  );
};

export default Input;
