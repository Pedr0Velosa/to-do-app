import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";
import { separateTodo } from "@/services/todo/separateTodo";
import { KanbanStatus } from "@/utils/types/Kanban";
import { Task } from "@/utils/types/Task";

type dataType = {
  id: string;
  status: KanbanStatus;
  title: string;
  updatedAt: Date;
  tasks: Task[];
};

export default async function handlerCreate(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "POST") {
    const { title, user_Id } = req.body;
    if (!title || !user_Id) return res.end();
    try {
      await prisma.to_do.create({
        data: {
          user_Id,
          title,
          status: "to-do",
        },
      });
      return res.send("To do created");
    } catch (err) {
      return res.status(404).send({ error: "Failed to create " });
    }
  }
  if (method === "GET") {
    const { user_Id } = req.body;
    try {
      const query = (await prisma.to_do.findMany({
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
      const data = separateTodo(query);
      return res.send(data);
    } catch (err) {
      return res.status(404).send({ error: "Failed to fetch data" });
    }
  }
}
