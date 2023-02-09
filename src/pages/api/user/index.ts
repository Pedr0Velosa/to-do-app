import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";
type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type UserApiRequest = Override<
  NextApiRequest,
  { body: { email: string; password: string } }
>;
export default async function getAll(
  req: UserApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    const { email, password } = req.query;
    if (!email || !password) return res.end();
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: email as string,
        },
      });
      if (!data) return res.status(200).json({ error: "User not found" });
      return res.send(data);
    } catch (err) {
      return;
    }
  }
  if (method === "UPDATE") {
  }
  return res.status(404).send({ error: "Route not found" });
}
