"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { TransitionLink } from "@/components/animations";

import { Input, PasswordInput } from "@/components/inputs";

import { apiClient } from "@/lib/api-client";
import { SIGN_UP_ROUTE } from "@/utils/constants";
import { authErrors } from "@/utils/errors";

import useAppStore from "@/store";
import Image from "next/image";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useAppStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    if (!!userInfo.email) {
      if (userInfo.profileSetup) {
        router.push("/chat");
      } else router.push("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleSignUp = async () => {
    try {
      if (
        authErrors(
          email,
          password,
          setErrorEmail,
          setErrorPassword,
          name,
          setErrorName
        )
      ) {
        const firstName = name.split(" ")[0];
        const lastName = name.split(" ")[1];

        const response = await apiClient.post(
          SIGN_UP_ROUTE,
          { firstName, lastName, email, password },
          { withCredentials: true }
        );

        if (response.status === 201) {
          setUserInfo(response.data.user);
          router.push("/profile");
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 500) {
        setErrorEmail("Internal Server Error");
      }
    }
  };

  return (
    <main className="min-h-screen xl:p-8 grid place-content-center xl:place-content-stretch xl:grid-cols-2 gap-8">
      <section className="relative hidden xl:flex flex-col gap-3 items-center justify-center min-h-full rounded-xl bg-zinc-900 overflow-hidden">
        <div className="absolute -top-4 -left-1 w-[420px] border-4 border-zinc-800 rounded-xl overflow-hidden rotate-12">
          <img src="/chat.png" alt="chat" className=" object-contain" />
        </div>
        <div className="absolute -top-4 -right-6 w-[420px] border-4 border-zinc-800 rounded-xl overflow-hidden -rotate-[30deg]">
          <img src="/chat-2.png" alt="chat" className=" object-contain" />
        </div>
        <div className="absolute -bottom-2 -left-3 w-[420px] border-4 border-zinc-800 rounded-xl overflow-hidden rotate-6">
          <img src="/profile.png" alt="chat" className=" object-contain" />
        </div>
        <div className="absolute -bottom-0 -right-10 w-[420px] border-4 border-zinc-800 rounded-xl overflow-hidden -rotate-[20deg]">
          <img src="/chat-4.png" alt="chat" className=" object-contain" />
        </div>
        <h2 className="text-5xl font-extrabold">Chaters</h2>
        <div className="text-lg font-bold">Encrypted Messages!!</div>
      </section>

      <section className="relative min-h-screen px-8 xl:px-0 xl:min-h-full flex flex-col items-center w-screen xl:w-full justify-center">
        <Link
          href="/"
          className="absolute top-4 left-4 lg:top-10 lg:left-10 text-white py-2 px-4 bg-zinc-900 bg-opacity-30 border-2 border-zinc-800 rounded-md"
        >
          Home
        </Link>
        <div className="grid gap-4 w-full max-w-[460px]">
          <h1 className="text-3xl font-semibold xl:text-5xl 2xl:text-5xl">
            Create an Account
          </h1>
          <p className="text-gray-600 dark:text-zinc-400">
            Already have an account?{" "}
            <TransitionLink
              href="/login"
              className="text-primaryLight dark:text-primaryDark font-bold"
            >
              Login
            </TransitionLink>
          </p>
        </div>

        <form
          className="mt-12 w-full max-w-[460px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <div className="flex flex-col gap-5 items-start">
            <Input
              value={name}
              setValue={setName}
              error={errorName}
              type="name"
            />
            <Input
              value={email}
              setValue={setEmail}
              error={errorEmail}
              type="email"
            />

            <PasswordInput
              password={password}
              setPassword={setPassword}
              errorPassword={errorPassword}
            />

            <button className="font-bold mt-5 w-full py-[14px] text-black bg-primary rounded-xl hover:text-white hover:bg-zinc-800 hover:bg-opacity-10 transition-all duration-300">
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
