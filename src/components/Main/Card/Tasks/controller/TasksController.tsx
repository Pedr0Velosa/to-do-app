import React from "react";
import Task from "../Task";
import { KanbanStatus } from "@/utils/types/Kanban";
import type { Task as TaskType } from "@/utils/types/Task";

type TasksProps = {
  tasks: TaskType[];
  status: KanbanStatus;
  doUpdateTask: any;
  doDeleteTask: any;
};

const TasksController = ({ tasks, doUpdateTask, doDeleteTask }: TasksProps) => {
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
