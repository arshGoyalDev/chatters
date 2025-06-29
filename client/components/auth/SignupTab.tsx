import { apiClient } from "@/lib/api-client";

import useAppStore from "@/store";

import { SIGN_UP_ROUTE } from "@/utils/constants";
import { authErrors } from "@/utils/errors";

import { useRouter } from "next/navigation";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";

const SignupTab = ({
  setTab,
}: {
  setTab: Dispatch<SetStateAction<"signup" | "login">>;
}) => {
  const router = useRouter();
  const { setUserInfo } = useAppStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
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
          setLoading(false);
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorEmail("Internal Server Error");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-4 w-[85vw] max-w-[400px]">
      <h2 className="text-3xl sm:text-4xl font-medium">Sign up to Continue</h2>

      <div className="mt-8 mb-12 flex gap-2">
        <span>Have an account?</span>
        <button
          className="underline underline-offset-4"
          onClick={() => setTab("login")}
        >
          Login
        </button>
      </div>

      <form onSubmit={handleSignUp} className="">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`py-4 px-4 w-full bg-transparent border-2 border-zinc-900 ${
            errorName
              ? "placeholder:text-red-600 text-red-600"
              : "placeholder:text-zinc-600 text-white"
          } rounded-t-lg`}
          autoComplete="off"
          placeholder="full name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`py-4 px-4 w-full bg-transparent border-2 border-zinc-900 mt-1 ${
            errorEmail
              ? "placeholder:text-red-600 text-red-600"
              : "placeholder:text-zinc-600 text-white"
          }`}
          autoComplete="off"
          placeholder="email"
        />
        <div className="relative mt-1">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`py-4 px-4 w-full bg-transparent border-2 border-zinc-900 ${
              errorPassword
                ? "placeholder:text-red-600 text-red-600"
                : "placeholder:text-zinc-600 text-white"
            }`}
            autoComplete="off"
            placeholder="password..."
          />

          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-zinc-300"
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>

        <button className="py-4 px-4 font-bold w-full mt-1 text-black bg-primary rounded-b-lg">
          {loading ? (
            <span className="">signing up ...</span>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </form>

      {(errorEmail || errorPassword) && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-center text-red-500">
          <div className="bg-zinc-900 py-1.5 pb-1 px-2 rounded-lg">
            {errorEmail}
          </div>
          <div className="bg-zinc-900 py-1.5 pb-1 px-2 rounded-lg">
            {errorPassword}
          </div>
        </div>
      )}
    </div>
  );
};
export default SignupTab;
