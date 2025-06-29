import { useChatList } from "@/context";

import useAppStore from "@/store";

import { Chat } from "@/utils/types";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const SearchChats = ({
  setSearchedChatList,
}: {
  setSearchedChatList: Dispatch<SetStateAction<Chat[]>>;
}) => {
  const { userInfo } = useAppStore();
  const { chatsList } = useChatList();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchValue !== "") {
        const searchedChatList = chatsList.filter((chat) => {
          const chatName =
            chat.chatType === "personal"
              ? userInfo._id === chat.chatAdmin._id
                ? `${chat.chatMembers[0].firstName} ${chat.chatMembers[0].lastName}`
                : `${chat.chatAdmin.firstName} ${chat.chatAdmin.lastName}`
              : chat.chatName;

          if (chatName.toLowerCase().includes(searchValue.toLowerCase()))
            return chat;
        });

        setSearchedChatList(searchedChatList);
      } else {
        setSearchedChatList(chatsList);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchValue, chatsList]);

  return (
    <div className="mb-3">
      <div className="flex bg-zinc-900 md:bg-zinc-950 pl-3 rounded-lg">
        <button className="p-1">
          <span className="stroke-zinc-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>{" "}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          name="search-chats"
          placeholder="Search..."
          className="py-3 px-3 bg-transparent placeholder:text-zinc-600"
        />
      </div>
    </div>
  );
};
export default SearchChats;
