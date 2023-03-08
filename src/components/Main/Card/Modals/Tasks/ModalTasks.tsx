import { Box, Button } from "@mui/material";
import React from "react";

type TasksContainerProps = {
  toogleVisibility: () => void;
  children: React.ReactNode;
};

const TasksContainer = ({ toogleVisibility, children }: TasksContainerProps) => {
  return (
    <Box sx={{ maxHeight: 250, overflow: "auto" }}>
      <Button size="small" onClick={toogleVisibility} sx={{ width: "fit-content" }}>
        add task
      </Button>
      {children}
    </Box>
  );
};

export default TasksContainer;
