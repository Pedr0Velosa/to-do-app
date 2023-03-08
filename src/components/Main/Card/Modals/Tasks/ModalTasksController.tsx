import React from "react";
import { dataType } from "@/services/todo/separateTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { KanbanStatus } from "@/utils/types/Kanban";
import type { Task as TaskType } from "@/utils/types/Task";
import { METHODS } from "@/utils/Methods";
import Task from "@components/Main/Card/Tasks/Task";

type TasksProps = {
  tasks: TaskType[];
  status: KanbanStatus;
  id: string;
};

const ModalTasksController = ({ tasks, status, id }: TasksProps) => {
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

export default ModalTasksController;
