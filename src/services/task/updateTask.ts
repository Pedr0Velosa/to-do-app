import { prisma } from "@/libs/prisma";

type updateTask = {
  id: string;
  done: boolean;
};
export default async function updateTask({ id, done }: updateTask) {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      done,
    },
  });
}
