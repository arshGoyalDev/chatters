"use client";

import { apiClient } from "@/lib/api-client";

import useAppStore from "@/store";

import { GET_CHATS_ROUTE } from "@/utils/constants";

import { Chat } from "@/utils/types";

import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

interface ChatListContextType {
  chatsList: Chat[];
  getChats: () => void;
}

const ChatListContext = createContext<ChatListContextType>({
  chatsList: [],
  getChats: () => {},
});

const useChatList = () => useContext(ChatListContext);

const ChatListProvider = ({ children }: { children: ReactElement }) => {
  const [chatsList, setChatsList] = useState<Chat[]>([]);
  const { chatData, messages, userInfo } = useAppStore();

  const getChats = async () => {
    try {
      const response = await apiClient.get(GET_CHATS_ROUTE, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setChatsList(response.data.chats);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (userInfo.email !== "") {
      getChats();
    }
  }, [chatData, messages, userInfo]);

  return (
    <ChatListContext.Provider value={{ chatsList, getChats }}>
      {children}
    </ChatListContext.Provider>
  );
};

export { useChatList };
export default ChatListProvider;
