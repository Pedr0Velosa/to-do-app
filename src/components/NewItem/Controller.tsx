import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";

export type IFormValues = {
  title: string;
};

const NewItemController = () => {
  const {
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<IFormValues>({ defaultValues: { title: "" } });

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
            setError={setError}
            setValue={setValue}
          />
        )}
      />
    </>
  );
};

export default NewItemController;
