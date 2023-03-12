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
    refetchOnWindowFocus: false,
  });
  const { control, setValue, reset, watch } = useForm<useFormType>({
    defaultValues: { title: "", description: "", status: "" },
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOpen) return;
    queryClient.invalidateQueries({ queryKey: ["todos", id] });
  }, [id, isOpen, queryClient]);

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
          <TasksController tasks={data.tasks} status={data.status} id={data.id} />
          {isNewTaskInputVisible ? (
            <NewTaskController todoprops={data} setIsVisible={setIsNewTaskInputVisible} id={data.id} />
          ) : null}
        </TasksContainer>
      </Stack>
    </ModalWrapper>
  );
};

export default CardInfo;
