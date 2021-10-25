import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import { githubProvider, googleProvider } from "../components/auth/AuthMethods";
import { AuthContext } from "../components/auth/AuthProvider";


import socialMediaAuth from "../components/auth/SocialMediaAuth";
import { GithubIcon } from "../components/icon/GithubIcon";
import { GoogleIcon } from "../components/icon/GoogleIcon";
import { Button } from "../components/shared/Button";


const Signin: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    currentUser && router.push("/dashboard");
  }, [currentUser]);

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res);
  };

  return (
    <div className="w-screen h-screen bg-white font-family-karla">
      <div className="grid place-items-center mt-12 md:pt-0 md:px-24 lg:px-32">
        <Image src="/icon.png" width={250} height={200} />
        <p className="text-center text-xl font-bold mt-6">
          アカウントにログイン
        </p>
        <Button
          variant="solid-black"
          className="py-4 w-72 sm:w-80 mt-7"
          onClick={() => {
            handleOnClick(githubProvider);
          }}
        >
          <div className="flex">
            <GithubIcon iconColor="white" className="mr-3" />
            <span>Sign in with Github</span>
          </div>
        </Button>
        <Button
          variant="solid-white"
          className="py-4 w-72 sm:w-80 mt-5"
          onClick={() => {
            handleOnClick(googleProvider);
          }}
        >
          <div className="flex">
            <GoogleIcon className="mr-3" />
            <span>Sign in with Google</span>
          </div>
        </Button>
        <div className=" pt-6 pb-12">
          <p className="text-sm">
            アカウントをお持ちでありませんか？{" "}
            <Link href="/signup">
              <a className="text-blue-400">サインアップ</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signin;
