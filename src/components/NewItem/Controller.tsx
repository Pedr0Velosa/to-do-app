import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import axios from "axios";
import addNotification from "@/libs/toast/addNotification";
import { METHODS } from "@/utils/Methods";

export type INewItemForm = {
  title: string;
};

const NewItemController = () => {
  const {
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<INewItemForm>({ defaultValues: { title: "" } });
  async function createToDo(title: string) {
    if (!title) {
      setError("title", {
        type: "custom",
        message: "To do must have a title!",
      });
      return;
    }
    await axios("/api/todo", { method: METHODS.CREATE, data: { title } })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.data.error) {
          addNotification({ title: "Failed to create To do", type: "error" });
        }
      });
    setValue("title", "");
    addNotification({ title: "To do created", type: "success" });
  }
  function onClick(data: INewItemForm) {
    const { title } = data;
    createToDo(title);
  }
  return (
    <>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            field={field}
            handleSubmit={handleSubmit}
            errors={errors}
            onClick={onClick}
          />
        )}
      />
    </>
  );
};

export default NewItemController;
