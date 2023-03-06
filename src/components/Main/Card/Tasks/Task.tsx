import { Task } from "@/utils/types/Task";
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { METHODS } from "@/utils/Methods";
import { separateDataType } from "@/services/todo/separateTodo";
import { KanbanStatus } from "@/utils/types/Kanban";

type TaskProps = {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

const Task = ({ task, updateTask, deleteTask }: TaskProps) => {
  return (
    <>
      <ListItem
        disablePadding
        key={task.id}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task)}>
            <DeleteIcon color="error" />
          </IconButton>
        }
      >
        <ListItemButton dense onClick={() => updateTask(task)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={task.done}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": task.id }}
            />
          </ListItemIcon>
          <ListItemText id={task.id} primary={task.title} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default Task;
