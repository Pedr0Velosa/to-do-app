import { prisma } from "@/libs/prisma";

type updateTodoType = {
  id: string;
  status: string;
};

export default async function updateTodo({ id, status }: updateTodoType) {
  return await prisma.to_do.update({
    where: {
      id,
    },
    data: {
      status,
      updatedAt: new Date(),
    },
  });
}
