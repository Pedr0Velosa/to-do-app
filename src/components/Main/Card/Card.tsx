import React, { useRef, useState } from "react";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Todo } from "@/utils/types/Todo";
import { useDrag } from "react-dnd";
import { ItemType } from "@/utils/ItemType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { separateDataType } from "@/services/todo/separateTodo";
import axios from "axios";
import Task from "./Task";
import NewTask from "./NewTaskController";
import { Controller, useForm } from "react-hook-form";
import OutlinedInput from "@/components/Input/OutlinedInput";
import NewTaskController from "./NewTaskController";

type CardProps = {
  todo: Todo;
};
export type newTask = { newTask: string };

const Card = ({ todo }: CardProps) => {
  const [isNewTaskVisible, setIsNewTaskVisible] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CARD,
    item: { id: todo.id, todoStatus: todo.status },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: async (newTask: string) => {
      return await axios("/api/task", { method: "POST", params: { to_do_Id: todo.id, title: newTask } }).then(() =>
        setValue("newTask", "")
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
      if (previousTodos) {
        const newTask = getValues("newTask");
        if (!newTask) return;
        queryClient.setQueryData<unknown>(["todos"], (old: separateDataType) => ({
          ...old,
          [todo.status]: old[todo.status].map((prevTodo) => {
            if (prevTodo.id === todo.id) {
              return {
                ...prevTodo,
                tasks: [{ id: "1", title: newTask, done: false, to_do_Id: todo.id }, ...prevTodo.tasks],
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

  const {
    handleSubmit,
    setValue,
    control,
    setError,
    getValues,
    formState: { errors },
  } = useForm<newTask>({ defaultValues: { newTask: "" } });

  const sendRequest = async () => {
    const newTask = getValues("newTask");
    if (!newTask) return;
    createTask.mutate(newTask);
  };
  const onBlurNewTask = () => {
    sendRequest();
    setIsNewTaskVisible(false);
  };
  const onKeyDownNewTask = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendRequest();
      setIsNewTaskVisible(false);
      return;
    }
  };

  const toogleVisibility = () => setIsNewTaskVisible(!isNewTaskVisible);

  const opacity = isDragging ? 0.5 : 1;

  return (
    <MuiCard id={todo.id} ref={drag} sx={{ opacity }}>
      <CardContent>
        <Typography variant="h6" component="h1">
          {todo.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={toogleVisibility}>
          add task
        </Button>
      </CardActions>
      <CardContent sx={{ py: 0 }}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} disablePadding>
          {todo.tasks?.map((task) => (
            <Task task={task} key={task.id} status={todo.status} />
          ))}
          {isNewTaskVisible ? (
            <NewTaskController control={control} onBlur={onBlurNewTask} onKeyDown={onKeyDownNewTask} />
          ) : null}
        </List>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
