import { prisma } from "@/libs/prisma";

type createTodoProps = {
  user_Id: string;
  title: string;
};
export default async function createTodo({ user_Id, title }: createTodoProps) {
  return await prisma.to_do.create({
    data: {
      user_Id,
      title,
      status: "to-do",
    },
  });
}
