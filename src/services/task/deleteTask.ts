import { prisma } from "@/libs/prisma";

type deleteTask = {
  id: string;
};
export default async function deleteTask({ id }: deleteTask) {
  return await prisma.task.delete({
    where: {
      id,
    },
  });
}
