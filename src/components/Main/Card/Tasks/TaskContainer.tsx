import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import React from "react";

type TasksContainerProps = {
  setIsVisile: (value: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};

const StyledBox = styled(Box)({
  maxHeight: 250,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "12px",
    backgroundColor: "#F5F5F5",
  },
  "&::-webkit-scrollbar-track": {
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    borderRadius: "10px",
    backgroundColor: "#F5F5F5",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
    backgroundColor: "#555",
  },
});

const TasksContainer = ({ setIsVisile, size = "small", children }: TasksContainerProps) => {
  const toogleVisibility = () => setIsVisile((prevState) => !prevState);

  return (
    <StyledBox>
      <Button size={size} onClick={toogleVisibility} sx={{ width: "fit-content" }}>
        add task
      </Button>
      {children}
    </StyledBox>
  );
};

export default TasksContainer;
