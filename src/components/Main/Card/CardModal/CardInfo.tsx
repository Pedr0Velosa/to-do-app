import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { singleTodoType } from "@/services/todo/getTodo";
import { Divider, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TasksController from "../Tasks/controller/TasksController";
import NewTaskController from "../Tasks/controller/NewTaskController";
import TasksContainer from "../Tasks/TaskContainer";
import { KanbanStatus } from "@/utils/types/Kanban";
import Status from "./Status/Status";
import Description from "./Description/Description";
import Title from "./Title/Title";
import { METHODS } from "@/utils/Methods";
import type { Task as TaskType } from "@/utils/types/Task";
import { dataType } from "@/services/todo/separateTodo";
import ModalWrapper from "@/components/Modal/ModalWrapper";

type CardInfoProps = {
  id: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export type useFormType = {
  title: string;
  description: string;
  status: KanbanStatus | "";
};

const CardInfo = ({ id, isOpen, open, close }: CardInfoProps) => {
  const [isNewTaskInputVisible, setIsNewTaskInputVisible] = useState<boolean>(false);
  const { data, isLoading } = useQuery<singleTodoType>({
    queryKey: ["todos", id],
    queryFn: () => axios(`/api/todo/${id}`).then((res) => res.data),
  });
  const { control, setValue, reset, watch } = useForm<useFormType>({
    defaultValues: { title: "", description: "", status: "" },
  });
  const queryClient = useQueryClient();

  const doUpdateTask = useMutation({
    mutationFn: (task: TaskType) => {
      return axios(`/api/task/`, {
        method: METHODS.UPDATE,
        data: { id: task.id, done: task.done },
      });
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["todos", id] });

      const previousTodos = queryClient.getQueryData<dataType>(["todos", id]);
      if (previousTodos) {
        queryClient.setQueryData<unknown>(["todos", id], (old: dataType) => ({
          ...old,
          tasks: old.tasks.map((t) => {
            if (t.id !== task.id) return t;
            return { ...t, done: !t.done };
          }),
        }));
      }
      return { previousTodos };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<dataType>(["todos", id], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", id] });
    },
  });
  const doDeleteTask = useMutation({
    mutationFn: (task: TaskType) => {
      return axios(`/api/task/`, {
        method: METHODS.DELETE,
        data: { id: task.id },
      });
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["todos", id] });

      const previousTodos = queryClient.getQueryData<dataType>(["todos", id]);
      if (previousTodos) {
        queryClient.setQueryData<unknown>(["todos", id], (old: dataType) => ({
          ...old,
          tasks: old.tasks.filter((t) => {
            if (t.id === task.id) {
              return;
            }
            return t;
          }),
        }));
      }
      return { previousTodos };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<dataType>(["todos", id], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", id] });
    },
  });

  useEffect(() => {
    if (!data) return;
    reset(data);
    setValue("title", data.title);
    setValue("description", data.description ?? "");
    setValue("status", data.status);
  }, [data, setValue, reset]);

  if (isLoading || !data) return <>Loading...</>;

  return (
    <ModalWrapper isOpen={isOpen} open={open} close={close}>
      <Stack gap={2}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Title field={field} setValue={setValue} />}
        />
        <Status status={watch("status")} setStatus={setValue} />
        <Divider />
        <Controller name="description" control={control} render={({ field }) => <Description field={field} />} />
        <Divider />
        <TasksContainer setIsVisile={setIsNewTaskInputVisible} size="medium">
          <TasksController
            tasks={data.tasks}
            status={data.status}
            doUpdateTask={doUpdateTask}
            doDeleteTask={doDeleteTask}
          />
          {isNewTaskInputVisible ? (
            <NewTaskController todoprops={data} setIsVisible={setIsNewTaskInputVisible} id={data.id} />
          ) : null}
        </TasksContainer>
      </Stack>
    </ModalWrapper>
  );
};

export default CardInfo;
