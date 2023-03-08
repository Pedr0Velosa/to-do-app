import { prisma } from "@/libs/prisma";
import { KanbanStatus } from "@/utils/types/Kanban";
import { Task } from "@/utils/types/Task";

export type singleTodoType = {
  id: string;
  status: KanbanStatus;
  title: string;
  tasks: Task[];
  description: string;
};

type getTodoProps = {
  id: string;
};

export default async function getTodo({ id: todo_id }: getTodoProps): Promise<singleTodoType> {
  return (await prisma.to_do.findUnique({
    where: {
      id: todo_id,
    },
    select: {
      id: true,
      description: true,
      status: true,
      title: true,
      tasks: true,
    },
  })) as unknown as singleTodoType;
}
