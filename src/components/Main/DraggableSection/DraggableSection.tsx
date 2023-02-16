import React from "react";
import { Box } from "@mui/material";
import Card from "../Card/Card";
import { KanbanStatus } from "@/utils/types/Kanban";
import { Todo } from "@/utils/types/Todo";
import { useDrop } from "react-dnd";
import { ItemType } from "@/utils/ItemType";
import { useMutation, useQueryClient } from "react-query";
import { separateDataType } from "@/services/todo/separateTodo";
import axios from "axios";
import { METHODS } from "@/utils/Methods";

type DraggableSectionType = {
  status: KanbanStatus;
  data: any;
};

const DraggableSection = ({ status, data }: DraggableSectionType) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemType.CARD,
    drop: ({ id }: { id: string }) => mutation.mutate(id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return sendRequest(id);
    },
    // onMutate: async (newTodo: string) => {
    //   await queryClient.cancelQueries({ queryKey: ["todos"] });

    //   const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
    //   // if (previousTodos) {
    //   //   queryClient.setQueryData<unknown>(["todos"], (old: separateDataType) => ({
    //   //     ...old,
    //   //     "to-do": [...old["to-do"], { id: 0, title: newTodo, status: "to-do", tasks: [], updatedAt: new Date() }],
    //   //   }));
    //   // }

    //   return { previousTodos };
    // },
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<separateDataType>(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const sendRequest = async (id: string) => {
    return await axios("/api/todo", { method: METHODS.UPDATE, params: { id, status } }).then(
      (response) => response.data
    );
  };

  const isActive = canDrop && isOver;
  return (
    <Box
      ref={drop}
      sx={{
        bgcolor: "ButtonFace",
        height: "100%",
        overflow: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {!data ? (
        <>Loading...</>
      ) : (
        data[status]
          .filter((todo: Todo) => todo.status === status)
          .map((filteredTodo: Todo) => <Card todo={filteredTodo} key={filteredTodo.id} />)
      )}
    </Box>
  );
};

export default DraggableSection;
