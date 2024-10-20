"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAppStore from "@/store";
import { apiClient } from "@/lib/api-client";
import { GET_USER_INFO_ROUTE } from "@/utils/constants";

const ProfilePage = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    // console.log(userInfo);
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO_ROUTE, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserInfo(response.data.user);
        } else {
          throw new Error("No User Found");
        }

        console.log({ response });
      } catch (error) {
        if (error) {
          router.push("/sign-up");
        }
      }
    };

    if (userInfo.email === "") {
      getUserInfo();
    }
  });

  return (
    <main className="min-h-screen xl:p-8 grid place-content-center xl:place-content-stretch xl:grid-cols-2 gap-8">
      Profile Page
    </main>
  );
};

export default ProfilePage;
