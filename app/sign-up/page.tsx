"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { TransitionLink } from "@/components/animations";

import { Input, PasswordInput } from "@/components/inputs";

import { apiClient } from "@/lib/api-client";
import { SIGN_UP_ROUTE } from "@/utils/constants";
import { authErrors } from "@/utils/errors";

import useAppStore from "@/store";

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
          console.log(response);
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
