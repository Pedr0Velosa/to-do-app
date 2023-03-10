import SignIn from "@/components/Sign/SignIn/SignIn";
import Head from "next/head";
import { NextPage } from "next/types";
import React from "react";

const SignInPage: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
    </>
  );
};

export default SignInPage;
