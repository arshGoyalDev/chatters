/* eslint-disable @next/next/no-img-element */
import useAppStore from "@/store";

import { HOST } from "@/utils/constants";

import { Dispatch, SetStateAction, useEffect } from "react";

const ChatHeader = ({
  chatInfoVisible,
  setChatInfoVisible,
}: {
  chatInfoVisible: boolean;
  setChatInfoVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const { chatData, setChatType, setChatData, userInfo } = useAppStore();

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  return (
    <header className="flex items-center gap-4 justify-between py-5 px-5 border-b-2 border-zinc-900">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setChatType(null);
            setChatData(null);
          }}
          className="md:hidden"
        >
          <span className="stroke-white">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden">
            <img
              src={`${HOST}/${chatData?.chatPic}`}
              alt={chatData?.chatName}
            />
          </div>

          <div>
            <h2 className="font-bold text-3xl">{chatData?.chatName}</h2>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          chatInfoVisible
            ? setChatInfoVisible(false)
            : setChatInfoVisible(true);
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
    </header>
  );
};
export default ChatHeader;
