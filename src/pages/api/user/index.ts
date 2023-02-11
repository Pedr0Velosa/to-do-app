import type { NextApiRequest, NextApiResponse } from "next";
import getUser from "@/libs/backend/user/getUsers";
import createUser from "@/libs/backend/user/createUser";
import bcrypt from "bcrypt";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type UserApiRequest = Override<
  NextApiRequest,
  { body: { email: string; password: string; username: string }; query: { email: string; password: string } }
>;

export default async function handler(req: UserApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    const { email, password } = req.query;

    if (!email || !password) return res.end();

    try {
      const data = await getUser({ email });

      if (!data) return res.status(200).json({ error: "User not found" });

      const validPassword = await bcrypt.compare(password, data.password);

      if (!validPassword) return res.status(200).json({ error: "Email or password is incorrect" });

      return res.send(data);
    } catch (err) {
      return;
    }
  }
  if (method === "POST") {
    const { email, password, username } = req.body;

    if (!email || !password || !username) return res.end();

    const salt = bcrypt.genSaltSync();
    const hashedPasswords = await bcrypt.hash(password, salt);

    try {
      const data = createUser({ email, password: hashedPasswords, username });
      if (!data) return res.status(200).json({ error: "Cannot create user" });
      return res.status(200).json({});
    } catch (err) {
      return;
    }
  }
  if (method === "PUT") {
  }
  if (method === "DELETE") {
  }
  return res.status(404).send({ error: "Route not found" });
}
