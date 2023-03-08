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

type TasksProps = {
  tasks: TaskType[];
  status: KanbanStatus;
};

const TasksController = ({ tasks, status }: TasksProps) => {
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
      console.log(previousTodos);

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
        const aa = queryClient.getQueryData<separateDataType>(["todos"]);
        console.log(aa);
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

  return (
    <>
      {tasks?.map((task) => (
        <Task task={task} key={task.id} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
    </>
  );
};

export default TasksController;
