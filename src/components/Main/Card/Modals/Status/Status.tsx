import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { KanbanStatus } from "@/utils/types/Kanban";
import { UseFormSetValue } from "react-hook-form";
import { useFormType } from "../CardInfo";

type StatusProps = {
  status: KanbanStatus | "" | undefined;
  setStatus: UseFormSetValue<useFormType>;
};

const Status = ({ status, setStatus }: StatusProps) => {
  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus("status", e.target.value as KanbanStatus);
  };

  const color = status === "to-do" ? "error" : status === "doing" ? "warning" : status === "done" ? "success" : "error";

  return (
    <>
      <Box>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <FormControl>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              value={status ?? ""}
              autoWidth
              label="Age"
              onChange={handleStatusChange}
            >
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
