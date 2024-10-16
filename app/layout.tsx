import { Josefin_Slab } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

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
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${josefinSlab.className} bg-zinc-950 text-white`}>
        {children}
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
