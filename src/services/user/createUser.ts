import { prisma } from "@/libs/prisma";

type createUserProps = {
  email: string;
  password: string;
  username: string;
};
export default async function createUser({ email, password, username }: createUserProps) {
  const data = await prisma.user.create({
    data: {
      email,
      password,
      username,
    },
  });
  return data;
}
