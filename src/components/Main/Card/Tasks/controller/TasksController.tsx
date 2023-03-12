import React from "react";
import Task from "../Task";
import { KanbanStatus } from "@/utils/types/Kanban";
import type { Task as TaskType } from "@/utils/types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { METHODS } from "@/utils/Methods";
import axios from "axios";
import { dataType, separateDataType } from "@/services/todo/separateTodo";

type TasksProps = {
  tasks: TaskType[];
  status: KanbanStatus;
  id?: string;
};

const TasksController = ({ tasks, id, status }: TasksProps) => {
  const queryClient = useQueryClient();

  const doUpdateTaskWithId = useMutation({
    mutationFn: (task: TaskType) => {
      return axios(`/api/task`, {
        method: METHODS.UPDATE,
        data: { id: task.id, done: task.done },
      });
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["todos", id] });

      const previousTodos = queryClient.getQueryData<dataType>(["todos", id]);
      if (previousTodos && id) {
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
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
    },
  });
  const doDeleteTaskWithId = useMutation({
    mutationFn: (task: TaskType) => {
      return axios(`/api/task`, {
        method: METHODS.DELETE,
        data: { id: task.id },
      });
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["todos", id] });

      const previousTodos = queryClient.getQueryData<dataType>(["todos", id]);
      if (previousTodos && id) {
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
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
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
      await queryClient.cancelQueries({ queryKey: ["todos"], exact: true });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
      if (previousTodos && !id) {
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
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
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
      await queryClient.cancelQueries({ queryKey: ["todos"], exact: true });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);

      if (previousTodos && !id) {
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
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
    },
  });

  const updateTask = async (task: TaskType) => {
    if (task.id === "1") return;
    if (id) return doUpdateTaskWithId.mutate(task);
    return doUpdateTask.mutate(task);
  };
  const deleteTask = async (task: TaskType) => {
    if (task.id === "1") return;
    if (id) return doDeleteTaskWithId.mutate(task);
    return doDeleteTask.mutate(task);
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
