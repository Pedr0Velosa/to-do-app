import type { NextApiRequest, NextApiResponse } from "next";
import getTodo from "@/services/todo/getTodo";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type UserApiRequest = Override<NextApiRequest, { query: MyCustomRequestBody }>;

export type MyCustomRequestBody = {
  id: string;
};

export default async function handlerCreate(req: UserApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    const { id } = req.query;
    try {
      const data = await getTodo({ id });
      return res.send(data);
    } catch (err) {
      return res.status(404).send({ error: "Failed to fetch data" });
    }
  }

  // if (method === "PUT") {
  //   const { id, status } = req.query;
  //   try {
  //     await updateTodo({ id, status });
  //     return res.send("To do updated");
  //   } catch (err) {
  //     return res.status(404).send({ error: "Failed to update data" });
  //   }
  // }
}
