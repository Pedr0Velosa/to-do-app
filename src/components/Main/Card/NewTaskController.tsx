import React from "react";
import OutlinedInput from "@components/Input/OutlinedInput";
import { Control, Controller } from "react-hook-form";
import { newTask } from "./Card";

const NewTaskController = ({
  control,
  onBlur,
  onKeyDown,
}: {
  control: Control<newTask, any>;
  onBlur: () => void;
  onKeyDown: any;
}) => {
  const rest = { onBlur, onKeyDown, autoFocus: true };
  return (
    <>
      <Controller
        name="newTask"
        control={control}
        render={({ field }) => (
          <OutlinedInput
            field={field}
            fullWidth={true}
            id="new-task"
            type="text"
            label="New Task"
            margin="none"
            {...rest}
          />
        )}
      />
    </>
  );
};

export default NewTaskController;
