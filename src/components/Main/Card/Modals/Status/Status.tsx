import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { KanbanStatus } from "@/utils/types/Kanban";

type StatusProps = {
  status: KanbanStatus | null;
  onChange: (e: SelectChangeEvent) => void;
};

const Status = ({ status, onChange }: StatusProps) => {
  const color = status === "to-do" ? "error" : status === "doing" ? "warning" : status === "done" ? "success" : "error";

  return (
    <>
      <Box>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <FormControl>
            <InputLabel id="status">Status</InputLabel>
            <Select labelId="status" id="status" value={status ?? ""} autoWidth label="Age" onChange={onChange}>
              <MenuItem value={"to-do"}>To do</MenuItem>
              <MenuItem value={"doing"}>Doing</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </FormControl>
          <CircleIcon color={color} />
        </Stack>
      </Box>
    </>
  );
};

export default Status;
