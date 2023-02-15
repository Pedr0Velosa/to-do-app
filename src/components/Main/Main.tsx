import { Box } from "@mui/material";
import React from "react";
import DraggableSection from "./DraggableSection/DraggableSection";

const Main = () => {
  return (
    <Box
      component={"main"}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 2,
        overflowX: "auto",
        mt: 8,
      }}
    >
      <DraggableSection />
      <DraggableSection />
      <DraggableSection />
    </Box>
  );
};

export default Main;
