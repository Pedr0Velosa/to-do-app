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
import type { IFormValues } from "./Controller";
import type {
  ControllerRenderProps,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

type InputProps = {
  field: ControllerRenderProps<IFormValues, "title">;
  handleSubmit: UseFormHandleSubmit<IFormValues>;
  errors: FieldErrors<IFormValues>;
  setError: UseFormSetError<IFormValues>;
  setValue: UseFormSetValue<IFormValues>;
};

const Input = ({
  field,
  handleSubmit,
  errors,
  setError,
  setValue,
}: InputProps) => {
  async function createToDo(title: string) {
    if (!title) {
      setError("title", {
        type: "custom",
        message: "To do must have a title!",
      });
      return;
    }
    await axios
      .post("/api/todo/create", { title })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.data.error) {
          addNotification({ title: "Failed to create To do", type: "error" });
        }
      });
    setValue("title", "");
    addNotification({ title: "Failed to create To do", type: "success" });
  }
  function onClick(data: IFormValues) {
    const { title } = data;
    createToDo(title);
  }
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
