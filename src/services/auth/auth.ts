import axios from "axios";
import { v4 as uuid } from "uuid";

type signInRequestProps = {
  id: string;
  username: string;
  email: string;
};
export function signInRequest({ id, username, email }: signInRequestProps) {
  return {
    token: uuid(),
    user: {
      id,
      username,
      email,
    },
  };
}

export async function recoveryUserInfo(id: string) {
  return await axios(`/api/user/${id}`).then((response) => response.data);
}
