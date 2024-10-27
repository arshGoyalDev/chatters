"use client";

import { ReactElement, useEffect } from "react";

import { animatePageIn } from "@/utils/animations";

import { PageTransition } from "@/components/animations";

import { getUserInfo } from "@/lib/auth-functions";

import { usePathname, useRouter } from "next/navigation";

import useAppStore from "@/store";

const Template = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUserInfo } = useAppStore();

  useEffect(() => {
    if (pathname !== "/") {
      getUserInfo(router, setUserInfo, pathname);
    }

    animatePageIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageTransition />
      {children}
    </div>
  );
};

export default Template;
