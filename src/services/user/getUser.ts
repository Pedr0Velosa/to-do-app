import { prisma } from "@/libs/prisma";

type getUsersProps = {
  email?: string;
  id?: string;
};
export default async function getUser({ id, email }: getUsersProps) {
  const data = await prisma.user.findUnique({
    where: {
      email,
      id,
    },
    select: {
      id: true,
      createdAt: false,
      email: true,
      username: true,
      password: true,
      updatedAt: false,
      _count: false,
      To_do: false,
    },
  });
  return data || { password: null };
}
