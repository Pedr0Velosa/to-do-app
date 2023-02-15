import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";

const useAuth = () => {
  const { signIn, logOut, user, isAuth } = useContext(authContext);
  return { signIn, logOut, user, isAuth };
};

export default useAuth;
