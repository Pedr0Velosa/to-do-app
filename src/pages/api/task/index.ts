import type { NextApiRequest, NextApiResponse } from "next";
import { KanbanStatus } from "@/utils/types/Kanban";
import { Task } from "@/utils/types/Task";
import createTask from "@/services/task/createTask";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type UserApiRequest = Override<NextApiRequest, { query: { to_do_Id: string; title: string } }>;

type dataType = {
  id: string;
  status: KanbanStatus;
  title: string;
  updatedAt: Date;
  tasks: Task[];
};

export default async function handlerCreate(req: UserApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "POST") {
    const { to_do_Id, title } = req.query;
    try {
      const data = await createTask({ to_do_Id, title });
      return res.send(data);
    } catch (err) {
      return res.status(404).send({ error: "Failed to fetch data" });
    }
  }
}
