import React from "react";
import { Box } from "@mui/material";
import Card from "../Card/Card";

const DraggableSection = () => {
  return (
    <Box sx={{ bgcolor: "ButtonFace", height: "100%", overflow: "auto" }}>
      <Card />
    </Box>
  );
};

export default DraggableSection;
