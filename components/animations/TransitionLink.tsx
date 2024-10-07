"use client";

import { useRouter, usePathname } from "next/navigation";

import { animatePageOut } from "@/utils/animations";
import { ReactNode } from "react";

const TransitionLink = ({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTransition = () => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <button onClick={handleTransition} className={className}>
      {children}
    </button>
  );
};

export default TransitionLink;
