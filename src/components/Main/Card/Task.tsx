import { Task } from "@/utils/types/Task";
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { METHODS } from "@/utils/Methods";
import { separateDataType } from "@/services/todo/separateTodo";
import { KanbanStatus } from "@/utils/types/Kanban";

const Task = ({ task, status }: { task: Task; status: KanbanStatus }) => {
  const queryClient = useQueryClient();

  const doUpdateTask = useMutation({
    mutationFn: () => {
      return axios("/api/task", {
        method: METHODS.UPDATE,
        data: { id: task.id, done: task.done },
      });
    },
    onMutate: async () => {
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
    mutationFn: () => {
      return axios("/api/task", {
        method: METHODS.DELETE,
        data: { id: task.id },
      });
    },
    onMutate: async () => {
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
        const aaa = queryClient.getQueryData<separateDataType>(["todos"]);
        console.log(aaa);
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

  const updateTask = async () => {
    if (task.id === "1") return;
    doUpdateTask.mutate();
  };
  const deleteTask = async () => {
    if (task.id === "1") return;
    doDeleteTask.mutate();
  };

  return (
    <>
      <ListItem
        disablePadding
        key={task.id}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={deleteTask}>
            <DeleteIcon color="error" />
          </IconButton>
        }
      >
        <ListItemButton dense onClick={updateTask}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={task.done}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": task.id }}
            />
          </ListItemIcon>
          <ListItemText id={task.id} primary={task.title} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default Task;
