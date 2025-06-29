"use client";

import { ChatsList, UserMenu } from "./ui";

const SideMenu = () => {
  return (
    <main className="relative z-20 w-full md:w-[38vw] lg:w-[30vw] xl:w-[26vw] 2xl:w-[20vw] h-screen bg-zinc-950 md:bg-zinc-900/60 select-none overflow-y-auto">
      <UserMenu />
      <ChatsList />
    </main>
  );
};

export default SideMenu;
