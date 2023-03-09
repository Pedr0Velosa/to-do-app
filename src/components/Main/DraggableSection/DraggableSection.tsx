import React from "react";
import { Stack } from "@mui/material";
import Card from "../Card/Card";
import { KanbanStatus } from "@/utils/types/Kanban";
import { Todo } from "@/utils/types/Todo";
import { useDrop } from "react-dnd";
import { ItemType } from "@/utils/ItemType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { separateDataType } from "@/services/todo/separateTodo";
import axios from "axios";
import { METHODS } from "@/utils/Methods";
import styled from "@emotion/styled";

type DraggableSectionType = {
  status: KanbanStatus;
  data: any;
};
const StyledStack = styled(Stack)({
  backgroundColor: "ButtonFace",
  height: "100%",
  overflow: "auto",
  padding: 16,
  minWidth: 300,
  overflowY: "auto",
  flex: 1,
});

const DraggableSection = ({ status, data }: DraggableSectionType) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemType.CARD,
    drop: ({ id, todoStatus }: { id: string; todoStatus: KanbanStatus }) => {
      if (todoStatus === status) return;
      mutation.mutate({ id, prevStatus: todoStatus });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, prevStatus }: { id: string; prevStatus: KanbanStatus }) => {
      return await axios("/api/todo", { method: METHODS.UPDATE, params: { id, status } }).then(
        (response) => response.data
      );
    },
    onMutate: async ({ id: todoID, prevStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);

      if (previousTodos) {
        let movedItem = previousTodos[prevStatus].find((item) => item.id === todoID);
        movedItem!.status = status;
        queryClient.setQueryData<unknown>(["todos"], (old: separateDataType) => ({
          ...old,
          [prevStatus]: old[prevStatus].filter((item) => {
            return item.id !== todoID ? item : null;
          }),
          [status]: [movedItem, ...old[status]],
        }));
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

  const opacity = canDrop && isOver ? 0.5 : 1;

  return (
    <StyledStack ref={drop} gap={2} sx={{ opacity }}>
      {!data ? (
        <>Loading...</>
      ) : (
        data[status]
          .filter((todo: Todo) => todo.status === status)
          .map((filteredTodo: Todo) => <Card todo={filteredTodo} key={filteredTodo.id} />)
      )}
    </StyledStack>
  );
};

export default DraggableSection;
