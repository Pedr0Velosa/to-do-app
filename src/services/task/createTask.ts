import { prisma } from "@/libs/prisma";

type createTask = {
  to_do_Id: string;
  title: string;
};
export default async function createTask({ to_do_Id, title }: createTask) {
  await prisma.task.create({
    data: {
      to_do_Id,
      title,
      done: false,
    },
  });
}
