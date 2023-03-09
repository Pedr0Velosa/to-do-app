import React, { useState } from "react";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { Todo } from "@/utils/types/Todo";
import { useDrag } from "react-dnd";
import { ItemType } from "@/utils/ItemType";
import TasksController from "./Tasks/controller/TasksController";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import CardInfo from "./Modals/CardInfo";

import NewTaskController from "./Tasks/controller/NewTaskController";
import TasksContainer from "./Tasks/TaskContainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { METHODS } from "@/utils/Methods";
import type { Task as TaskType } from "@/utils/types/Task";
import { separateDataType } from "@/services/todo/separateTodo";
import CardTitle from "./Title/CardTitle";

type CardProps = {
  todo: Todo;
};
export type newTask = { newTask: string };

const Card = ({ todo }: CardProps) => {
  const [isNewTaskInputVisible, setIsNewTaskInputVisible] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CARD,
    item: { id: todo.id, todoStatus: todo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const queryClient = useQueryClient();

  const doUpdateTask = useMutation({
    mutationFn: (task: TaskType) => {
      return axios("/api/task", {
        method: METHODS.UPDATE,
        data: { id: task.id, done: task.done },
      });
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
      if (previousTodos) {
        queryClient.setQueryData<unknown>(["todos"], (old: separateDataType) => ({
          ...old,
          [todo.status]: old[todo.status].map((todo) => {
            if (todo.id === task.to_do_Id) {
              return {
                ...todo,
                tasks: todo.tasks.map((t) => {
                  if (t.id === task.id) {
                    return { ...t, done: !t.done };
                  }
                  return t;
                }),
              };
            }
            return todo;
          }),
        }));
      }
      return { previousTodos };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<separateDataType>(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const doDeleteTask = useMutation({
    mutationFn: (task: TaskType) => {
      return axios("/api/task", {
        method: METHODS.DELETE,
        data: { id: task.id },
      });
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<unknown>(["todos"], (old: separateDataType) => ({
          ...old,
          [todo.status]: old[todo.status].map((todo) => {
            if (todo.id === task.to_do_Id) {
              return {
                ...todo,
                tasks: todo.tasks?.filter((t) => {
                  if (t.id === task.id) {
                    return;
                  }
                  return t;
                }),
              };
            }
            return todo;
          }),
        }));
      }
      return { previousTodos };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<separateDataType>(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const setNewTaskInputFalse = () => setIsNewTaskInputVisible(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const opacity = isDragging ? 0.5 : 1;

  return (
    <>
      <ModalWrapper isOpen={isOpenModal} open={openModal} close={closeModal}>
        <CardInfo id={todo.id} />
      </ModalWrapper>
      <MuiCard id={todo.id} ref={drag} sx={{ opacity, flexShrink: 0 }}>
        <CardContent>
          <CardTitle openModal={openModal} title={todo.title} />
        </CardContent>
        <CardContent sx={{ py: 0 }}>
          <TasksContainer setIsVisile={setIsNewTaskInputVisible}>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} disablePadding>
              <TasksController
                tasks={todo.tasks}
                status={todo.status}
                doUpdateTask={doUpdateTask}
                doDeleteTask={doDeleteTask}
              />
              {isNewTaskInputVisible ? (
                <NewTaskController todoprops={todo} setIsVisible={setNewTaskInputFalse} />
              ) : null}
            </List>
          </TasksContainer>
        </CardContent>
      </MuiCard>
    </>
  );
};

export default Card;
