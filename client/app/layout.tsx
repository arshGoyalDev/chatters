import { ReactElement } from "react";

import { Quicksand } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

import ContextContainer from "@/context";
import { HOST } from "@/utils/constants";

const metadata: Metadata = {
  title: "Chatters",
  description: "Chatters - A Powerful online chat application",
  icons: {
    icon: `${HOST}/uploads/favicon.ico`,
  },
};

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactElement;
}>) => {
  return (
    <html lang="en">
      <body className={`${quicksand.className} relative bg-zinc-950 text-white`}>
        <ContextContainer>{children}</ContextContainer>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
