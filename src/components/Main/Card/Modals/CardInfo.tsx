import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { singleTodoType } from "@/services/todo/getTodo";
import { Box, Divider, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import StandardInput from "@/components/Input/StandardInput";
import TasksController from "./Tasks/ModalTasksController";
import NewTaskController from "../Tasks/NewTaskController";
import TasksContainer from "./Tasks/ModalTasks";
import { KanbanStatus } from "@/utils/types/Kanban";
import Status from "./Status/Status";
import Description from "./Description/Description";
import Title from "./Title/Title";

type CardInfoProps = { id: string };

export type useFormType = {
  title: string;
  description: string;
};

const CardInfo = ({ id }: CardInfoProps) => {
  const [isNewTaskInputVisible, setIsNewTaskInputVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<KanbanStatus | null>(null);
  const { data, isLoading } = useQuery<singleTodoType>({
    queryKey: ["todos", id],
    queryFn: () => axios(`/api/todo/${id}`).then((res) => res.data),
  });
  const { control, setValue, reset } = useForm<useFormType>({
    defaultValues: { title: "", description: "" },
  });

  useEffect(() => {
    if (!data) return;
    reset(data);
    setValue("title", data.title);
    setValue("description", data.description ?? "");
    setStatus(data.status);
  }, [data, setValue, reset]);

  const toogleVisibility = () => setIsNewTaskInputVisible(!isNewTaskInputVisible);
  const setNewTaskInputFalse = () => setIsNewTaskInputVisible(false);
  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value as KanbanStatus);
  };

  if (isLoading || !data) return <>Loading...</>;

  return (
    <Stack gap={2}>
      <Controller name="title" control={control} render={({ field }) => <Title field={field} setValue={setValue} />} />
      <Status status={status} onChange={handleStatusChange} />
      <Divider />
      <Controller name="description" control={control} render={({ field }) => <Description field={field} />} />
      <Divider />
      <TasksContainer toogleVisibility={toogleVisibility}>
        <TasksController tasks={data.tasks} status={data.status} id={data.id} />
        {isNewTaskInputVisible ? (
          <NewTaskController todoprops={data} setNewTaskInputFalse={setNewTaskInputFalse} id={data.id} />
        ) : null}
      </TasksContainer>
    </Stack>
  );
};

export default CardInfo;
