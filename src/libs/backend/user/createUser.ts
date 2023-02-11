import { prisma } from "@/libs/prisma";
import { User } from "@/utils/types/user";

type createUserProps = {
  email: string;
  password: string;
  username: string;
};
export default async function createUser({ email, password, username }: createUserProps): Promise<User | null> {
  const data = await prisma.user.create({
    data: {
      email,
      password,
      username,
    },
  });
  return data;
}
