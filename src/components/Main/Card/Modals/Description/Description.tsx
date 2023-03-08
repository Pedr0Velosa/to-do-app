import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ControllerRenderProps } from "react-hook-form";

type DescriptionProps = {
  field: ControllerRenderProps<any, any>;
};

const Description = ({ field }: DescriptionProps) => {
  return (
    <>
      <Box px={2}>
        <Typography variant="h5" component={"h2"} marginBottom={2}>
          Description
        </Typography>
        <TextField
          id="description"
          placeholder="Write some description..."
          multiline
          fullWidth
          minRows={2}
          {...field}
        />
      </Box>
    </>
  );
};

export default Description;
