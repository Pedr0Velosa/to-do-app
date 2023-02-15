import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";

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
}
