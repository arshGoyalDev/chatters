"use client";

import { ReactElement, useEffect } from "react";

import { animatePageIn } from "@/utils/animations";

import { PageTransition } from "@/components/animations";

const Template = ({ children } : {children: ReactElement}) => {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <PageTransition />
      {children}
    </div>
  );
};

export default Template;
