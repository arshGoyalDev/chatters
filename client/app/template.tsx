"use client";

import { ReactElement, useEffect } from "react";

import { getUserInfo } from "@/lib/auth-functions";

import { usePathname, useRouter } from "next/navigation";

import useAppStore from "@/store";

import { useError } from "@/context";

const Template = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { setUserInfo } = useAppStore();
  const error = useError();

  useEffect(() => {
    getUserInfo(router, setUserInfo, pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}

      <div
        className={`z-[100] ${
          error?.errorMessage ? "translate-y-0" : "translate-y-[400px]"
        } bottom-4 right-4 lg:bottom-10 lg:right-10 fixed   w-72 flex flex-col gap-2 py-6 px-6 bg-zinc-950 border-2 border-red-600 rounded-lg transition-all duration-500`}
      >
        <h2 className="text-sm uppercase text-zinc-400 font-bold">Error</h2>
        <div className="lg:text-lg">{error?.errorMessage}</div>
      </div>
    </>
  );
};

export default Template;
