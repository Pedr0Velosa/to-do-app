import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import axios from "axios";
import addNotification from "@/libs/toast/addNotification";
import { METHODS } from "@/utils/Methods";
import useAuth from "@/utils/hooks/useAuth";

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

  const createToDo = async ({ title }: { title: string }) => {
    if (!validateTitle(title) || !isAuth) return;
    const res = await sendRequest(title);
    setValue("title", "");
    if (res.response?.data?.err) {
      addNotification({ title: "Failed to create to do", type: "error" });
      return;
    }
    setValue("title", "");
    addNotification({ title: "To do created", type: "success" });
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
