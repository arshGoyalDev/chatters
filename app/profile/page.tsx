"use client";

import { useEffect, useState } from "react";

import useAppStore from "@/store";

import { Input } from "@/components/inputs";

const ProfilePage = () => {
  const { userInfo, setUserInfo } = useAppStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (userInfo.email) {
      setFirstName(userInfo.firstName);
      if (userInfo.lastName) {
        setLastName(userInfo.lastName);
      }
    }
  }, [userInfo]);

  return (
    <main className="min-h-screen xl:p-8 grid place-content-center">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <div>
          <div className="w-[80vw] h-[80vw] max-w-[360px] max-h-[360px] grid place-content-center bg-zinc-900 border-2 border-zinc-700 rounded-2xl">
            <span className="fill-zinc-700">
              <svg
                width="150"
                height="150"
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
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[80vw] max-w-[400px]">
          <Input value={firstName} setValue={setFirstName} type="first-name" />
          <Input value={lastName} setValue={setLastName} type="last-name" />

          <button className="font-bold mt-3 w-full py-[14px] text-black bg-primary rounded-xl hover:text-white hover:bg-zinc-800 hover:bg-opacity-10 transition-all duration-300">
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
