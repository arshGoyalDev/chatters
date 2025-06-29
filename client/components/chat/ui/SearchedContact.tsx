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
import Image from "next/image";

import { useEffect, useState } from "react";

const SearchedContact = ({
  contact,
  groupChat = false,
}: {
  contact: UserInfo;
  groupChat?: boolean;
}) => {
  const router = useRouter();

  const errorContext = useError();
  const chatList = useChatList();

  const { setChatData } = useAppStore();

  const [chatExists, setChatExists] = useState("");

  useEffect(() => {
    chatList?.chatsList.forEach((chat) => {
      if (chat.chatType === "personal") {
        if (
          contact._id === chat.chatAdmin._id ||
          contact._id === chat.chatMembers[0]._id
        ) {
          setChatExists(chat._id);
        }
      }
    });
  }, [chatList]);

  const selectContact = async () => {
    if (chatExists !== "") {
      try {
        const response = await apiClient.post(
          GET_CHAT_DATA,
          { chatId: chatExists },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setChatData(response.data.chat);
          router.push("/chat");
        }
      } catch (error) {
        errorContext?.setErrorMessage("Failed to retrieve chat data");
      }
    } else {
      try {
        const response = await apiClient.post(
          CREATE_PERSONAL_CHAT_ROUTE,
          { chatMemberId: contact._id, chatMemberFirstName: contact.firstName },
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
    <div
      onClick={() => {
        if (!groupChat) {
          selectContact();
        }
      }}
      key={contact.email}
      className="flex items-center gap-4 py-3 px-4 hover:bg-zinc-900 hover:bg-opacity-50 transition-all duration-100 rounded-lg cursor-pointer"
    >
      <div className="w-12 h-12 rounded overflow-hidden">
        {contact.profilePic ? (
          <div className="relative w-12 aspect-square rounded-md overflow-hidden">
            <Image src={`${HOST}/${contact.profilePic}`}
              fill sizes="100%"
              alt={contact.firstName + contact.lastName}
              className="w-full h-full" priority />
          </div>
        ) : (
          <div className="grid place-content-center bg-zinc-800 h-full">
            <span className="fill-zinc-600">
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
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold text-lg">{`${contact.firstName} ${contact.lastName}`}</p>
        <p className="text-sm">
          {contact.userOnline ? "Online" : contact.status}
        </p>
      </div>
    </div>
  );
};
export default SearchedContact;
