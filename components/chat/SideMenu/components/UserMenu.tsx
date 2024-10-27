"use client";

import { useEffect, useState } from "react";

import useAppStore from "@/store";

import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";

import Link from "next/link";

import { useRouter } from "next/navigation";

const UserMenu = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useAppStore();

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const logout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/");

        setUserInfo({
          email: "",
          password: "",
          profileSetup: false,
          firstName: "",
          lastName: "",
          status: "",
          profilePic: "",
        });
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex py-6 justify-between items-center px-4">
      <div className="flex items-center justify-center gap-4">
        <div className="grid place-content-center w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden">
          {userInfo.profilePic ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${HOST}/${userInfo.profilePic}`}
              alt={userInfo.firstName}
            />
          ) : (
            <span className="fill-zinc-700">
              <svg
                width="60"
                height="40"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
          <p className="text-zinc-300">{userInfo.status}</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            menuVisible ? setMenuVisible(false) : setMenuVisible(true);
          }}
          className="py-1 px-1 border-2 border-transparent focus:border-zinc-800 hover:bg-zinc-800 rounded-lg"
        >
          <span className="fill-white">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                strokeWidth="1.5"
              />
              <path
                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                strokeWidth="1.5"
              />
              <path
                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </button>
        {menuVisible && (
          <div className="absolute top-16 right-0 w-48 font-bold flex flex-col rounded-lg bg-zinc-800 overflow-hidden">
            <Link
              href="/profile"
              className="w-full flex items-center justify-between py-3 pl-5 pr-4 border-b-2 border-zinc-700 hover:bg-zinc-700 hover:bg-opacity-30"
            >
              Profile
              <span className="stroke-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.14 21.62C17.26 21.88 16.22 22 15 22H8.99998C7.77998 22 6.73999 21.88 5.85999 21.62C6.07999 19.02 8.74998 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.58 10.58C15.58 12.56 13.98 14.17 12 14.17C10.02 14.17 8.42004 12.56 8.42004 10.58C8.42004 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center justify-between py-3 pl-5 pr-4 hover:bg-zinc-700 hover:bg-opacity-30"
            >
              Logout
              <span className="stroke-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12H3.62"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
