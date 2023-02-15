import type { NextApiRequest, NextApiResponse } from "next";
import getUser from "@/services/user/getUser";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type UserApiRequest = Override<NextApiRequest, { query: { id: string } }>;

export default async function handler(req: UserApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) return res.end();

  try {
    const data = await getUser({ id });

    return res.send(data);
  } catch (err) {
    return res.status(404).send({ error: "Route not found" });
  }
}
