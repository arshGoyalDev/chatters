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

import { Chat, Message, SocketContextType, UserInfo } from "@/utils/types";

import { useChatList } from "./ChatListContext";

const SocketContext = createContext<SocketContextType | null>(null);

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: ReactElement }) => {
  const { getChats } = useChatList();
  const socket = useRef<Socket | null>(null);

  const { userInfo, addMessage, setChatData } = useAppStore();

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
        message: Message;
        newChat: Chat;
      }) => {
        const { chatData, setChatData } = useAppStore.getState();
        const { leavingMemberId, message, newChat } = data;

        getChats();

        if (chatData?._id === newChat._id) {
          if (userInfo._id === leavingMemberId) {
            setChatData(null);
          } else {
            setChatData(newChat);
            addMessage(message);
          }
        }
      };

      const handleMemberAdded = (data: {
        chatId: string;
        message: Message;
        chatMembers: UserInfo[];
      }) => {
        const { chatId, message, chatMembers } = data;
        const { chatData } = useAppStore.getState();

        getChats();

        if (chatId === chatData?._id) {
          addMessage(message);
          setChatData({
            ...chatData,
            chatMembers,
          });
        }
      };

      const handleTypingEvent = ({ isTyping, userInfo, chatId }: { isTyping: boolean; userInfo: UserInfo; chatId: string}) => {
        const { usersTyping, setUsersTyping } = useAppStore.getState();

        let newUsers = usersTyping;

        if (isTyping) {
          let alreadyTyping = false;
          newUsers.forEach((user) => {
            if (user.userData._id === userInfo._id && chatId == user.chatId) alreadyTyping = true;
          })

          if (!alreadyTyping) {
            newUsers = [{ userData: userInfo, chatId }, ...newUsers];
          }
        } else {
          newUsers = newUsers.filter((indicator) => !(indicator.userData._id === userInfo._id && indicator.chatId === chatId));
        }

        setUsersTyping(newUsers);
      };

      socket.current.on("event:chat:left", handleMemberLeaving);
      socket.current.on("event:chat:deleted", handleGroupChatDelete);
      socket.current.on("event:chat:receive", handleReceiveMessage);
      socket.current.on("event:chat:added", handleMemberAdded);
      socket.current.on("event:chat:typing", handleTypingEvent);

      // Cleanup function
      return () => {
        if (socket.current) {
          socket.current.off("event:chat:receive");
          socket.current.off("event:chat:left");
          socket.current.off("event:chat:deleted");
          socket.current.off("event:chat:added");
          socket.current.off("event:chat:typing", handleTypingEvent);

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
