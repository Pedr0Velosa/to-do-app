import React from "react";
import OutlinedInput from "@components/Input/OutlinedInput";
import { Control, Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newTask } from "../../Card";
import { METHODS } from "@/utils/Methods";
import axios from "axios";
import { dataType, separateDataType } from "@/services/todo/separateTodo";
import { Todo } from "@/utils/types/Todo";
import { singleTodoType } from "@/services/todo/getTodo";

type NewTaskControllerProps = {
  todoprops: Todo | singleTodoType;
  setIsVisible: (bool: boolean) => void;
  id?: string;
};

const NewTaskController = ({ setIsVisible, todoprops, id }: NewTaskControllerProps) => {
  const queryClient = useQueryClient();

  const {
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<newTask>({ defaultValues: { newTask: "" } });

  const createTaskWithId = async (newTask: string) => {
    await queryClient.cancelQueries({ queryKey: ["todos", id] });

    const previousTodos = queryClient.getQueryData<dataType>(["todos", id]);
    if (previousTodos) {
      if (!newTask) return previousTodos;
      queryClient.setQueryData<unknown>(["todos", id], (old: dataType) => ({
        ...old,
        tasks: [{ id: "1", title: newTask, done: false, to_do_Id: todoprops.id }, ...old.tasks],
      }));
    }
    return previousTodos;
  };
  const createTaskNoId = async (newTask: string) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });

    const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
    if (previousTodos) {
      if (!newTask) return previousTodos;
      queryClient.setQueryData<unknown>(["todos"], (old: separateDataType) => ({
        ...old,
        [todoprops.status]: old[todoprops.status].map((prevTodo) => {
          if (prevTodo.id === todoprops.id) {
            return {
              ...prevTodo,
              tasks: [{ id: "1", title: newTask, done: false, to_do_Id: todoprops.id }, ...prevTodo.tasks],
            };
          }
          return prevTodo;
        }),
      }));
    }
    return previousTodos;
  };
  const createTask = async () => {
    const newTask = getValues("newTask");
    if (!newTask) return;
    doCreateTask.mutate(newTask);
  };
  const doCreateTask = useMutation({
    mutationFn: async (newTask: string) => {
      return await axios("/api/task", {
        method: METHODS.CREATE,
        params: { to_do_Id: todoprops.id, title: newTask },
      }).then(() => setValue("newTask", ""));
    },
    onMutate: async (newTask) => {
      if (!id) return { previousTodos: await createTaskNoId(newTask) };
      return { previousTodos: await createTaskWithId(newTask) };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTodos) {
        if (!id)
          return queryClient.setQueryData<separateDataType>(["todos"], context.previousTodos as separateDataType);
        return queryClient.setQueryData<dataType>(["todos", id], context.previousTodos as dataType);
      }
    },
    onSettled: () => {
      if (!id) return queryClient.invalidateQueries({ queryKey: ["todos"] });
      return queryClient.invalidateQueries({ queryKey: ["todos", id] });
    },
  });

  const setNewTaskInputFalse = () => setIsVisible(false);
  const onBlurNewTask = () => {
    createTask();
    setNewTaskInputFalse();
  };
  const onKeyDownNewTask = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      createTask();
      setNewTaskInputFalse();
      return;
    }
  };

  const rest = { onBlur: onBlurNewTask, onKeyDown: onKeyDownNewTask, autoFocus: true };

  return (
    <>
      <Controller
        name="newTask"
        control={control}
        render={({ field }) => (
          <OutlinedInput
            field={field}
            fullWidth={true}
            id="new-task"
            type="text"
            label="New Task"
            margin="none"
            {...rest}
          />
        )}
      />
    </>
  );
};

export default NewTaskController;
