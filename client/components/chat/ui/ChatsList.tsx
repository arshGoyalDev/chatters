import useAppStore from "@/store";

import dayjs from "dayjs";

import { Chat } from "@/utils/types";
import { HOST } from "@/utils/constants";

import Link from "next/link";

import { useChatList } from "@/context";

import { useEffect, useState } from "react";

import SearchChats from "./SearchChats";
import Image from "next/image";

const ChatsList = () => {
  const { chatsList } = useChatList();
  const { setChatData, userInfo, chatData, usersTyping } = useAppStore();

  const [searchedChatList, setSearchedChatList] = useState<Chat[]>([]);
  const [tab, setTab] = useState<"all" | "group" | "personal">("all");
  
  const openChat = (chat: Chat) => {
    setChatData(chat);
  };

  useEffect(() => {
    setSearchedChatList(chatsList);
  }, [chatsList]);
  
  const checkForUserTyping = (chatId: string) => {
    let userIsTyping = false;
    
    usersTyping.forEach((user) => {
      if (user.chatId === chatId) userIsTyping = true;
    })
    
    return userIsTyping
  }

  return (
    <div className="px-4 pt-2 pb-5">
      <h2 className="text-zinc-700 uppercase font-bold pb-3">Chats</h2>

      <SearchChats setSearchedChatList={setSearchedChatList} />

      <div className="flex flex-col gap-2">
        {searchedChatList.length !== 0 ? (
          searchedChatList.map((chat, index) => (
            <div
              key={chat._id}
              onClick={() => openChat(chat)}
              className={`flex justify-between gap-2 items-center ${chatData?._id === chat._id && "bg-zinc-950 bg-opacity-35"
                } transition-all duration-300 py-2 pl-2 pr-4 hover:bg-opacity-40 rounded-lg`}
            >
              <div className="flex gap-4 items-center">
                <div className="w-9 h-9 rounded-lg bg-zinc-800">
                  {(
                    chat?.chatType === "personal"
                      ? userInfo._id === chat.chatAdmin._id
                        ? chat.chatMembers[0].profilePic
                        : chat.chatAdmin.profilePic
                      : chat?.chatPic
                  ) ? (
                    <div className="relative w-9 h-9 overflow-hidden rounded-lg">
                      <Image src={`${HOST}/${chat.chatType === "personal"
                        ? userInfo._id === chat.chatAdmin._id
                          ? chat.chatMembers[0].profilePic
                          : chat.chatAdmin.profilePic
                        : chat.chatPic
                        }`} fill sizes="100%"
                        alt={chatData?.chatName || ""} className="w-full h-full" priority />
                    </div>
                  ) : (
                    <div className="w-full h-full grid place-content-center">
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
                <h2 className="text-lg">
                  {checkForUserTyping(chat._id) ? 
                    (<div className="text-primary font-semibold">
                      typing...
                  </div>) : 
                  (
                    <>
                  {chat.chatType === "personal"
                    ? userInfo._id === chat.chatAdmin._id
                      ? `${chat.chatMembers[0].firstName} ${chat.chatMembers[0].lastName}`
                      : `${chat.chatAdmin.firstName} ${chat.chatAdmin.lastName}`
                    : chat.chatName}
                      
                    </>
                  )
                    
              }
                </h2>
              </div>
              <div className="text-sm text-zinc-300 font-medium">
                {dayjs(chat.updatedAt).format('h:mm A  ')}
              </div>
            </div>
          ))
        ) : (
          <div className="font-semibold text-center py-5">
            No chats to show.
            <br />
            <span>Create a </span>
            {tab === "all" && (
              <>
                <Link className="text-primary" href={"/chat?new-chat=true"}>
                  new personal chat
                </Link>
                <span> or a </span>
                <Link
                  className="text-primary"
                  href={"/chat?new-group-chat=true"}
                >
                  new group chat
                </Link>
                .
              </>
            )}
            {tab === "personal" && (
              <>
                <Link className="text-primary" href={"/chat?new-chat=true"}>
                  new personal chat
                </Link>
                .
              </>
            )}
            {tab === "group" && (
              <>
                <Link
                  className="text-primary"
                  href={"/chat?new-group-chat=true"}
                >
                  new group chat
                </Link>
                .
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatsList;
