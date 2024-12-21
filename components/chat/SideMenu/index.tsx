"use client";

import { PersonalContacts, UserMenu } from "./components";

const SideMenu = () => {
  return (
    <main className="relative z-20 w-full md:w-[38vw] lg:w-[30vw] xl:w-[25vw] 2xl:w-[20vw] h-screen bg-zinc-900 select-none">
      <UserMenu />
      <PersonalContacts />
    </main>
  );
};

export default SideMenu;
