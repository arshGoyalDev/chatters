"use client";

import { LoginTab, SignupTab, AuthCarousel } from "@/components/auth";
import useAppStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const router = useRouter();
  const { userInfo } = useAppStore();

  const [tab, setTab] = useState<"signup" | "login">("signup");

  useEffect(() => {
    if (!!userInfo.email) {
      if (userInfo.profileSetup) {
        router.push("/chat");
      } else router.push("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <main className="h-screen grid xl:grid-cols-10 p-6">
      <button
        className="absolute top-7 left-[42%] z-50 flex items-center gap-2 text-white border-2 border-zinc-800 px-4 py-2 rounded-lg transition-all duration-300"
        onClick={() => router.push("/")}
      >
        <span className="stroke-white">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        Return to Home
      </button>
      <div className="col-span-4 bg-zinc-900/30 w-full h-full hidden xl:block rounded-2xl"></div>

      <div className="w-full col-span-4 flex flex-col justify-center items-center mx-auto xl:mx-0 xl:pl-[50%] xl:pr-[30%] 2xl:pr-[35%]">
        {tab === "signup" && <SignupTab setTab={setTab} />}
        {tab === "login" && <LoginTab setTab={setTab} />}
      </div>
      {/* <div className="col-span-6 flex w-[85vw] max-w-[440px] xl:w-full xl:max-w-full mx-auto xl:mx-0 xl:pl-[20%] xl:pr-[30%] 2xl:pr-[35%] justify-center flex-col"> */}
      {/* </div> */}
    </main>
  );
};

export default AuthPage;
