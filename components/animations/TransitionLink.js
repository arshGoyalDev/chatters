"use client";

import { useRouter, usePathname } from "next/navigation";

import { animatePageOut } from "@/utils/animations";

const TransitionLink = ({ children, href, className }) => {
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
