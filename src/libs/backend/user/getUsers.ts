import { prisma } from "@/libs/prisma";
import { User } from "@/utils/types/user";

type getUsersProps = {
  email: string;
};
export default async function getUser({ email }: getUsersProps): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
