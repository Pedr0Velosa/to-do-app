import React from "react";
import Task from "./Task";
import NewTaskController from "./NewTaskController";
import { useForm } from "react-hook-form";
import { separateDataType } from "@/services/todo/separateTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { KanbanStatus } from "@/utils/types/Kanban";
import type { Task as TaskType } from "@/utils/types/Task";
import { METHODS } from "@/utils/Methods";

export type newTask = { newTask: string };

type TasksProps = {
  tasks: TaskType[];
  status: KanbanStatus;
  isNewTaskInputVisible: boolean;
  todoID: string;
  setNewTaskInputFalse: () => void;
};

const TasksController = ({ tasks, status, isNewTaskInputVisible, todoID, setNewTaskInputFalse }: TasksProps) => {
  const {
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<newTask>({ defaultValues: { newTask: "" } });

  const queryClient = useQueryClient();
  const doCreateTask = useMutation({
    mutationFn: async (newTask: string) => {
      return await axios("/api/task", { method: METHODS.CREATE, params: { to_do_Id: todoID, title: newTask } }).then(
        () => setValue("newTask", "")
      );
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
      if (previousTodos) {
        if (!newTask) return { previousTodos };
        queryClient.setQueryData<unknown>(["todos"], (old: separateDataType) => ({
          ...old,
          [status]: old[status].map((prevTodo) => {
            if (prevTodo.id === todoID) {
              return {
                ...prevTodo,
                tasks: [{ id: "1", title: newTask, done: false, to_do_Id: todoID }, ...prevTodo.tasks],
              };
            }
            return prevTodo;
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
          [status]: old[status].map((todo) => {
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
          [status]: old[status].map((todo) => {
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

  const updateTask = async (task: TaskType) => {
    if (task.id === "1") return;
    doUpdateTask.mutate(task);
  };
  const deleteTask = async (task: TaskType) => {
    if (task.id === "1") return;
    doDeleteTask.mutate(task);
  };
  const createTask = async () => {
    const newTask = getValues("newTask");
    if (!newTask) return;
    doCreateTask.mutate(newTask);
  };

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

  return (
    <>
      {tasks?.map((task) => (
        <Task task={task} key={task.id} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
      {isNewTaskInputVisible ? (
        <NewTaskController control={control} onBlur={onBlurNewTask} onKeyDown={onKeyDownNewTask} />
      ) : null}
    </>
  );
};

export default TasksController;
