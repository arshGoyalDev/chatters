/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useRef,
} from "react";

import useAppStore from "@/store";

import { io, Socket } from "socket.io-client";

import { HOST } from "@/utils/constants";

import { Chat, Message, SocketContextType } from "@/utils/types";

import { useChatList } from "./ChatListContext";

const SocketContext = createContext<SocketContextType | null>(null);

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: ReactElement }) => {
  const { getChats } = useChatList();
  const socket = useRef<Socket | null>(null);

  const { userInfo, addMessage } = useAppStore();

  useEffect(() => {
    if (userInfo.email === "") {
      return;
    }

    if (userInfo.email !== "") {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      socket.current.on("connect", () => {
        return true;
      });

      const handleReceiveMessage = (message: Message) => {
        const { chatData } = useAppStore.getState();

        const isCurrentChat = chatData?._id === message.recipient;

        getChats();

        if (isCurrentChat) {
          addMessage(message);
        }
      };

      const handleGroupChatDelete = (chat: {
        chatId: string;
        chatName: string;
        chatAdmin: {
          name: string;
          _id: string;
        };
      }) => {
        const { chatData, setChatData } = useAppStore.getState();

        getChats();

        if (chatData?._id === chat.chatId) {
          setChatData(null);
        }

        if (userInfo._id !== chat.chatAdmin._id) {
          alert(`${chat.chatName} was deleted by admin ${chat.chatAdmin.name}`);
        }
      };

      const handleMemberLeaving = (data: {
        leavingMemberId: string;
        messageData: Message;
        newChat: Chat;
      }) => {
        const { chatData, setChatData } = useAppStore.getState();
        const { leavingMemberId, messageData, newChat } = data;

        getChats();

        if (chatData?._id === newChat._id) {
          if (userInfo._id === leavingMemberId) {
            setChatData(null);
          } else {
            setChatData(newChat);
            addMessage(messageData);
          }
        }
      };

      socket.current.on("memberLeft", handleMemberLeaving);
      socket.current.on("groupDeleted", handleGroupChatDelete);
      socket.current.on("receiveMessage", handleReceiveMessage);

      // Cleanup function
      return () => {
        if (socket.current) {
          socket.current.off("connect");
          socket.current.off("connect_error");
          socket.current.off("disconnect");
          socket.current.off("memberLeft");
          socket.current.off("groupDeleted");
          socket.current.off("receiveMessage");

          socket.current.disconnect();
        }
      };
    }
  }, [userInfo, addMessage]);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket };
export default SocketProvider;
