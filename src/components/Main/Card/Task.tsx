import { Task } from "@/utils/types/Task";
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";

const Task = ({ task }: { task: Task }) => {
  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (id: string) => {
  //     return sendRequest();
  //   },
  //   onMutate: async (todoID: any) => {
  //     await queryClient.cancelQueries({ queryKey: ["todos"] });

  //     const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
  //     if (previousTodos) {
  //       const newTask = getValues("newTask");
  //       if (!newTask) return;
  //       previousTodos[todo.status]
  //         .find(({ id }: { id: string }) => id === todo.id)
  //         ?.tasks.push({ id: "1", title: newTask, done: false, to_do_Id: todo.id });
  //     }
  //     return { previousTodos };
  //   },
  //   onError: (err, newTodo, context) => {
  //     if (context?.previousTodos) {
  //       queryClient.setQueryData<separateDataType>(["todos"], context.previousTodos);
  //     }
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  // });

  return (
    <>
      <ListItem
        disablePadding
        key={task.id}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon color="error" />
          </IconButton>
        }
      >
        <ListItemButton dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={false}
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
