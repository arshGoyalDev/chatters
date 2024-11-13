import { ReactElement } from "react";

import { Josefin_Slab } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

import ContextContainer from "@/context";

const metadata: Metadata = {
  title: "Chaters",
  description: "Chaters - A Powerful online chat application",
};

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactElement;
}>) => {
  return (
    <html lang="en">
      <body className={`${josefinSlab.className} bg-zinc-950 text-white`}>
        <ContextContainer>{children}</ContextContainer>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
