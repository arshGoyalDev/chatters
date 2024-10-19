"use client";

import useAppStore from "@/store";
import { useEffect } from "react";

const ProfilePage = () => {
  const { userInfo } = useAppStore();

  useEffect(() => {
     console.log(userInfo);
  })

  return (
    <main className="min-h-screen xl:p-8 grid place-content-center xl:place-content-stretch xl:grid-cols-2 gap-8">
      Profile Page
    </main>
  );
};
export default ProfilePage;
