import { Task } from "@/utils/types/Task";
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

const Task = ({ task }: { task: Task }) => {
  return (
    <>
      <ListItem disablePadding key={task.id}>
        <ListItemButton dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={false}
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
