import { Box } from "@mui/material";
import React from "react";
import DraggableSection from "./DraggableSection/DraggableSection";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/utils/hooks/useAuth";
import axios from "axios";
import { METHODS } from "@/utils/Methods";
import { separateDataType } from "@/services/todo/separateTodo";

const Main = () => {
  const { user } = useAuth();
  const { data } = useQuery<separateDataType>({
    queryKey: ["todos"],
    queryFn: async () => {
      return await axios("/api/todo", { method: METHODS.GET, params: { user_Id: user?.id } }).then(
        (response) => response.data
      );
    },
    enabled: !!user,
  });
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
      <DraggableSection status={"to-do"} data={data} />
      <DraggableSection status={"doing"} data={data} />
      <DraggableSection status={"done"} data={data} />
    </Box>
  );
};

export default Main;
