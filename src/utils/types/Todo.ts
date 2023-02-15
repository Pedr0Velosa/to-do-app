import { KanbanStatus } from "./Kanban";
import { Task } from "./Task";

export type Todo = {
  id: string;
  status: KanbanStatus;
  title: string;
  updatedAt: Date;
  tasks: Task[];
};
