import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import axios from "axios";
import addNotification from "@/libs/toast/addNotification";
import { METHODS } from "@/utils/Methods";
import useAuth from "@/utils/hooks/useAuth";
import { useMutation, useQueryClient } from "react-query";
import { separateDataType } from "@/services/todo/separateTodo";
import { v4 as uuid } from "uuid";

export type INewItemForm = {
  title: string;
};

const NewItemController = () => {
  const { user, isAuth } = useAuth();

  const {
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<INewItemForm>({ defaultValues: { title: "" } });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (title: string) => sendRequest(title),
    onMutate: async (newTodo: string) => {
      setValue("title", "");
      setValue("title", "");
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<separateDataType>(["todos"]);
      if (previousTodos) {
        queryClient.setQueryData<unknown>(["todos"], (old: separateDataType) => ({
          ...old,
          "to-do": [...old["to-do"], { id: uuid(), title: newTodo, status: "to-do", tasks: [], updatedAt: new Date() }],
        }));
      }

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<separateDataType>(["todos"], context.previousTodos);
        addNotification({ title: "Failed to create", type: "error" });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSuccess: () => addNotification({ title: "To do created", type: "success" }),
  });

  const createToDo = async ({ title }: { title: string }) => {
    if (!validateTitle(title) || !isAuth) return;
    mutation.mutate(title);
  };

  const validateTitle = (title: string) => {
    if (title) return true;
    setError("title", {
      type: "custom",
      message: "To do must have a title!",
    });
    return false;
  };

  const sendRequest = async (title: string) => {
    return await axios("/api/todo", { method: METHODS.CREATE, data: { title, user_Id: user?.id } }).then(
      (res) => res.data
    );
  };

  return (
    <>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input field={field} handleSubmit={handleSubmit} errors={errors} createToDo={createToDo} />
        )}
      />
    </>
  );
};

export default NewItemController;
