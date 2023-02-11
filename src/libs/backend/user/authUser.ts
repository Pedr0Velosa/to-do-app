import { prisma } from "@/libs/prisma";
import { User } from "@/utils/types/user";

type authUserProps = {
  email: string;
};
export default async function authUser({ email }: authUserProps) {
  const data = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
    select: {
      password: true,
    },
  });
  return data;
}
