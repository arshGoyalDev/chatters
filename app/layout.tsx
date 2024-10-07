import { Josefin_Slab } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

const metadata: Metadata = {
  title: "Chaters",
  description: "Chaters - A Powerful online chat application",
};

const josefinSlab = Josefin_Slab({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${josefinSlab.className}`}
      >
        {children}
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
