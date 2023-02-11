import { prisma } from "@/libs/prisma";
import { User } from "@/utils/types/user";

type getUsersProps = {
  email: string;
  password: string;
};
export default async function getUser({ email, password }: getUsersProps): Promise<User | null> {
  const data = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });
  return data;
}
