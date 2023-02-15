import React from "react";
import { Box } from "@mui/material";
import Card from "../Card/Card";
import { KanbanStatus } from "@/utils/types/Kanban";
import { Todo } from "@/utils/types/Todo";

type DraggableSectionType = {
  status: KanbanStatus;
  data: any;
};

const DraggableSection = ({ status, data }: DraggableSectionType) => {
  if (!data) return <>Loading...</>;
  return (
    <Box sx={{ bgcolor: "ButtonFace", height: "100%", overflow: "auto", p: 2 }}>
      {data[status]
        .filter((todo: Todo) => todo.status === status)
        .map((filteredTodo: Todo) => (
          <Card todo={filteredTodo} key={filteredTodo.id} />
        ))}
    </Box>
  );
};

export default DraggableSection;
