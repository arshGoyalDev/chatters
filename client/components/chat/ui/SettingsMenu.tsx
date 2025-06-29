"use client";

import { useRouter } from "next/navigation";

import { apiClient } from "@/lib/api-client";

import { LOGOUT_ROUTE } from "@/utils/constants";

import useAppStore from "@/store";

import { Dispatch, SetStateAction } from "react";

import { useError } from "@/context";

const SettingsMenu = ({
  setMenuVisible,
}: {
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const errorContext = useError();

  const router = useRouter();
  const { setUserInfo } = useAppStore();

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
          _id: "",
          email: "",
          password: "",
          profileSetup: false,
          firstName: "",
          lastName: "",
          status: "",
          profilePic: "",
          userOnline: false,
        });
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      errorContext?.setErrorMessage("Failed to logout");
    }
  };

  const handleLink = (link: string) => {
    router.push(link);
    setMenuVisible(false);
  };

  return (
    <div className="z-10 absolute top-[56px] -right-1 w-48 font-semibold flex flex-col rounded-lg bg-zinc-900 border-2 border-zinc-800 overflow-hidden">
      <button
        onClick={() => handleLink("/chat?new-chat=true")}
        className="w-full flex items-center justify-between py-2.5 pl-4 pr-4 border-b-2 border-zinc-800 hover:bg-zinc-700 hover:bg-opacity-30"
      >
        New Chat
        <span className="stroke-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3401 20C19.0601 19.85 19.7401 19.56 20.3001 19.13C21.8601 17.96 21.8601 16.03 20.3001 14.86C19.7501 14.44 19.0801 14.16 18.3701 14"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <button
        onClick={() => handleLink("/chat?new-group-chat=true")}
        className="w-full flex items-center justify-between py-2.5 pl-4 pr-4 border-b-2 border-zinc-800 hover:bg-zinc-700 hover:bg-opacity-30"
      >
        New Group Chat
        <span className="stroke-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <button
        onClick={() => handleLink("/profile")}
        className="w-full flex items-center justify-between py-2.5 pl-4 pr-4 border-b-2 border-zinc-800 hover:bg-zinc-700 hover:bg-opacity-30"
      >
        Profile
        <span className="stroke-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.14 21.62C17.26 21.88 16.22 22 15 22H8.99998C7.77998 22 6.73999 21.88 5.85999 21.62C6.07999 19.02 8.74998 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.58 10.58C15.58 12.56 13.98 14.17 12 14.17C10.02 14.17 8.42004 12.56 8.42004 10.58C8.42004 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58Z"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <button
        onClick={logout}
        className="w-full flex items-center justify-between py-2.5 pl-4 pr-4 hover:bg-zinc-700 hover:bg-opacity-30"
      >
        Logout
        <span className="stroke-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 12H3.62"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};
export default SettingsMenu;
