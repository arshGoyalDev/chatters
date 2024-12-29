"use client";

import { GroupsList, PersonalContacts, UserMenu } from "./components";

const SideMenu = () => {
  return (
    <main className="relative z-20 w-full md:w-[38vw] lg:w-[30vw] xl:w-[25vw] 2xl:w-[20vw] h-screen bg-zinc-900 select-none overflow-y-auto">
      <UserMenu />
      <PersonalContacts />
      <GroupsList />
    </main>
  );
};

export default SideMenu;
