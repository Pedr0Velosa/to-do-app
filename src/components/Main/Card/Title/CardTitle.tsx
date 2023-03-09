import { Box, ButtonBase, Typography } from "@mui/material";
import React from "react";

type CardTitleProps = {
  openModal: () => void;
  title: string;
};

const CardTitle = ({ openModal, title }: CardTitleProps) => {
  return (
    <Box>
      <ButtonBase
        sx={{
          display: "block",
          textAlign: "start",
          width: "100%",
          "&:hover": { background: "none", textDecoration: "underline" },
        }}
        onClick={openModal}
      >
        <Typography component="h1" variant="h6">
          {title}
        </Typography>
      </ButtonBase>
    </Box>
  );
};

export default CardTitle;
