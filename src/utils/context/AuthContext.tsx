import React, { createContext, useState, useEffect } from "react";
import { recoveryUserInfo, signInRequest } from "@services/auth/auth";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import Router from "next/router";

type authContextProps = {
  signIn: ({ id, username, email }: userProps) => void;
  logOut: () => void;
  user: userProps | null;
  isAuth: boolean;
};

export const authContext = createContext({} as authContextProps);

export type userProps = {
  id: string;
  username: string;
  email: string;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<userProps | null>(null);

  const isAuth = !!user;

  const signIn = ({ id, username, email }: userProps) => {
    const { token, user } = signInRequest({ id, username, email });
    setCookie(undefined, "auth.token", token, { httpOnly: true });
    setCookie(undefined, "userid.token", user.id, { httpOnly: true });

    setUser(user);

    Router.push("/");
  };
  const logOut = () => {
    destroyCookie({}, "auth.token");
    destroyCookie({}, "userid.token");

    setUser(null);

    Router.push("/signin");
  };

  useEffect(() => {
    const { "auth.token": token, "userid.token": tokenId } = parseCookies();
    if (!token || !tokenId) {
      Router.push("/signin");
    }
    recoveryUserInfo(tokenId)
      .then((response) => setUser(response))
      .catch((err) => new Error("Ops..."));
  }, []);

  return <authContext.Provider value={{ signIn, logOut, user, isAuth }}>{children}</authContext.Provider>;
};

export default AuthProvider;
