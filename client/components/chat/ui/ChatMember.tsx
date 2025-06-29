import { useChatList, useError } from "@/context";

import { apiClient } from "@/lib/api-client";
import { UserInfo } from "@/utils/types";
import {
  CREATE_PERSONAL_CHAT_ROUTE,
  GET_CHAT_DATA,
  HOST,
} from "@/utils/constants";

import useAppStore from "@/store";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Image from "next/image";

const ChatMember = ({
  member,
  admin = false,
}: {
  member: UserInfo;
  admin?: boolean;
}) => {
  const router = useRouter();
  const errorContext = useError();

  const { userInfo, setChatData } = useAppStore();
  const chatList = useChatList();

  const [chatExists, setChatExists] = useState("");

  useEffect(() => {
    chatList?.chatsList.forEach((chat) => {
      if (chat.chatType === "personal") {
        if (
          member._id === chat.chatAdmin._id ||
          member._id === chat.chatMembers[0]._id
        ) {
          setChatExists(chat._id);
        }
      }
    });
  }, [chatList]);

  const startChat = async () => {
    if (chatExists !== "") {
      try {
        const response = await apiClient.post(
          GET_CHAT_DATA,
          { chatId: chatExists },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setChatData(response.data.chat);
        }
      } catch (error) {
        errorContext?.setErrorMessage("Failed to retrieve chat data");
      }
    } else {
      try {
        const response = await apiClient.post(
          CREATE_PERSONAL_CHAT_ROUTE,
          { chatMemberId: member._id, chatMemberFirstName: member.firstName },
          { withCredentials: true }
        );

        if (response.status === 201) {
          setChatData(response.data.chat);
          router.push("/chat");
        }
      } catch (error) {
        errorContext?.setErrorMessage("Failed to start a new personal chat");
      }
    }
  };

  return (
    <div className="flex justify-between items-center py-3 px-3 bg-zinc-800 bg-opacity-5 border-2 border-zinc-800 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md">
          {member.profilePic ? (
            <div className="relative w-8 h-8 rounded-md overflow-hidden">
              <Image src={`${HOST}/${member.profilePic}`}
                fill sizes="100%"
                alt={member.firstName} className="w-full h-full" priority />
            </div>
          ) : (
            <div className="grid place-content-center w-full h-full border-2 border-zinc-800 rounded-md">
              <span className="fill-zinc-700">
                <svg
                  width="24"
                  height="24"
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
          )}
        </div>
        <div className="font-semibold text-sm">
          {userInfo._id === member._id
            ? "You"
            : `${member.firstName} ${member.lastName}`}
        </div>
      </div>

      <div className="flex gap-1 items-center">
        {userInfo._id !== member._id && (
          <button className="p-1.5" onClick={startChat}>
            <span className="stroke-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.98 6.79001V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.60001 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.01001 6.04004 6.04001C6.27004 3.35001 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.60001 21.98 6.79001Z"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.4955 13.25H13.5045"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.9955 13.25H10.0045"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.4955 13.25H6.5045"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMember;
