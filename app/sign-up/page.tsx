"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { TransitionLink } from "@/components/animations";

import { Input, PasswordInput } from "@/components/inputs";

import { apiClient } from "@/lib/api-client";

import { SIGN_UP_ROUTE } from "@/utils/constants";

import { authErrors } from "@/utils/errors";

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSignUp = async () => {
    if (authErrors(email, password, setErrorEmail, setErrorPassword)) {
      const response = await apiClient.post(
        SIGN_UP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      
      if (response.status === 201) {
        router.push("/profile");
      }
    }
  };

  return (
    <main className="min-h-screen xl:p-8 grid place-content-center xl:place-content-stretch xl:grid-cols-2 gap-8">
      <section className="hidden xl:block min-h-full rounded-xl bg-gray-200 dark:bg-zinc-800"></section>

      <section className="min-h-screen px-8 xl:px-0 xl:min-h-full flex flex-col items-center w-screen xl:w-full justify-center">
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
            <Input value={name} setValue={setName} error={""} type="name" />
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
