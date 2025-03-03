import useAppStore from "@/store";

import moment from "moment";

import { Chat } from "@/utils/types";
import { HOST } from "@/utils/constants";

import Link from "next/link";

import { useChatList } from "@/context";
import { useEffect, useState } from "react";

const ChatsList = () => {
  const { chatsList } = useChatList();
  const { setChatData, userInfo, chatData } = useAppStore();

  const [selectedChatList, setSelectedChatList] = useState<Chat[]>([]);
  const [tab, setTab] = useState<"all" | "group" | "personal">("all");

  const openChat = (chat: Chat) => {
    setChatData(chat);
  };

  useEffect(() => {
    if (tab === "all") setSelectedChatList(chatsList);
    if (tab === "personal") {
      const newChatList = chatsList.filter(
        (chat) => chat.chatType === "personal"
      );
      setSelectedChatList(newChatList);
    }

    if (tab === "group") {
      const newChatList = chatsList.filter((chat) => chat.chatType === "group");
      setSelectedChatList(newChatList);
    }
  }, [chatsList, tab]);

  return (
    <div className="px-2 pt-2 pb-5">
      <h2 className="text-zinc-700 uppercase font-bold px-2 pb-3">Chats</h2>

      <div className="py-2 px-2 grid grid-cols-3 bg-zinc-950 rounded-md mb-4">
        <button
          onClick={() => setTab("all")}
          className={`font-semibold py-1.5 px-2 ${
            tab === "all" && "bg-zinc-900"
          } rounded-md`}
        >
          All
        </button>
        <button
          onClick={() => setTab("personal")}
          className={`font-semibold py-1.5 px-2 ${
            tab === "personal" && "bg-zinc-900"
          } rounded-md`}
        >
          Personal
        </button>
        <button
          onClick={() => setTab("group")}
          className={`font-semibold py-1.5 px-2 ${
            tab === "group" && "bg-zinc-900"
          } rounded-md`}
        >
          Groups
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {selectedChatList.length !== 0 ? (
          selectedChatList.map((chat) => (
            <div
              key={chat._id}
              onClick={() => openChat(chat)}
              className={`flex justify-between gap-2 items-center hover:bg-zinc-800 ${
                chatData?._id === chat._id && "bg-zinc-800"
              } transition-all duration-300 py-2 pl-2 pr-4 rounded-lg hover:bg-opacity-40`}
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
                    // eslint-disable-next-line @next/next/no-img-element
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={`${HOST}/${
                          chat.chatType === "personal"
                            ? userInfo._id === chat.chatAdmin._id
                              ? chat.chatMembers[0].profilePic
                              : chat.chatAdmin.profilePic
                            : chat.chatPic
                        }`}
                        alt={chat.chatName}
                      />
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
                <h2 className="font-semibold text-lg">
                  {chat.chatType === "personal"
                    ? userInfo._id === chat.chatAdmin._id
                      ? `${chat.chatMembers[0].firstName} ${chat.chatMembers[0].lastName}`
                      : `${chat.chatAdmin.firstName} ${chat.chatAdmin.lastName}`
                    : chat.chatName}
                </h2>
              </div>
              {/* )} */}
              <div className="text-sm">
                {moment(chat.updatedAt).format("LT")}
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
