import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";

export default async function handlerCreate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.body;
  if (!title) {
    res.end();
    return;
  }
  try {
    await prisma.to_do.create({
      data: {
        user_Id: "a1f74e1e-9275-4245-9356-70abefcb7248",
        title,
        status: "to-do",
      },
    });
    res.send("To do created");
    return;
  } catch (err) {
    res.status(404).send({ error: "Failed to create " });
    return;
  }
}
