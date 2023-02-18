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
    drop: ({ id, todoStatus }: { id: string; todoStatus: KanbanStatus }) => {
      if (todoStatus === status) return;
      mutation.mutate(id);
    },
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
    onMutate: async (todoID: any) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
      if (previousTodos) {
        const { todoIndex, changedTodo } = getTodoAndTodoIndex(previousTodos, todoID);

        if (todoIndex === -1 || todoIndex === undefined || !changedTodo) return;

        previousTodos[status].push(changedTodo);
      }
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<separateDataType>(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const getTodoAndTodoIndex = (previousTodos: separateDataType | undefined, todoID: string) => {
    if (!previousTodos) return { todoIndex: undefined, changedTodo: undefined };
    let todoIndex: number = -1,
      changedTodo: Todo = {} as Todo;

    const keys: KanbanStatus[] = Object.keys(previousTodos) as KanbanStatus[];

    keys.forEach((todoStatus: KanbanStatus) => {
      if (todoIndex !== -1) return;
      todoIndex = previousTodos[todoStatus].findIndex(({ id }) => id === todoID);
      changedTodo = previousTodos[todoStatus][todoIndex];
      previousTodos[todoStatus].splice(todoIndex, 1);
    });

    return { todoIndex, changedTodo };
  };
  const sendRequest = async (id: string) => {
    return await axios("/api/todo", { method: METHODS.UPDATE, params: { id, status } }).then(
      (response) => response.data
    );
  };

  const opacity = canDrop && isOver ? 0.5 : 1;
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
        opacity,
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
