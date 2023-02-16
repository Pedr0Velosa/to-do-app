import { prisma } from "@/libs/prisma";
import { KanbanStatus } from "@/utils/types/Kanban";
import { Task } from "@/utils/types/Task";
type dataType = {
  id: string;
  status: KanbanStatus;
  title: string;
  updatedAt: Date;
  tasks: Task[];
};
type getTodoProps = {
  user_Id: string;
};
export default async function getTodo({ user_Id }: getTodoProps): Promise<dataType[]> {
  return (await prisma.to_do.findMany({
    where: {
      user_Id,
    },
    select: {
      id: true,
      description: false,
      status: true,
      title: true,
      updatedAt: true,
      createdAt: false,
      tasks: true,
    },
  })) as unknown as dataType[];
}
