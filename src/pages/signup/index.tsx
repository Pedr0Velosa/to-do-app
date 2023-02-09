import SignUp from "@/components/Sign/SignUp/SignUp";
import Head from "next/head";
import { NextPage } from "next/types";
import React from "react";

const SignUpPage: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUp />
    </>
  );
};

export default SignUpPage;
