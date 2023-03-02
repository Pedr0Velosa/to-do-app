import type { NextApiRequest, NextApiResponse } from "next";
import { separateTodo } from "@/services/todo/separateTodo";
import { KanbanStatus } from "@/utils/types/Kanban";
import { Task } from "@/utils/types/Task";
import getTodo from "@/services/todo/getTodo";
import createTodo from "@/services/todo/createTodo";
import updateTodo from "@/services/todo/updateTodo";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type UserApiRequest = Override<
  NextApiRequest,
  { body: { user_Id: string; title: string }; query: { id: string; status: string } }
>;

type dataType = {
  id: string;
  status: KanbanStatus;
  title: string;
  updatedAt: Date;
  tasks: Task[];
};

export default async function handlerCreate(req: UserApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    const { user_Id } = req.body;
    try {
      const query = await getTodo({ user_Id });
      const data = separateTodo(query);
      return res.send(data);
    } catch (err) {
      return res.status(404).send({ error: "Failed to fetch data" });
    }
  }
  if (method === "POST") {
    const { title, user_Id } = req.body;
    if (!title || !user_Id) return res.end();
    try {
      await createTodo({ title, user_Id });
      return res.send("To do created");
    } catch (err) {
      return res.status(404).send({ error: "Failed to create " });
    }
  }

  if (method === "PUT") {
    const { id, status } = req.query;
    try {
      await updateTodo({ id, status });
      return res.send("To do updated");
    } catch (err) {
      return res.status(404).send({ error: "Failed to update data" });
    }
  }
}
