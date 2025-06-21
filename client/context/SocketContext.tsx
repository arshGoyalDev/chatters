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
      
      const handleUserTyping = ({ userTyping, userData, chatId }: { userTyping: boolean; userData: UserInfo; chatId: string}) => {
        const { setUsersTyping, usersTyping } = useAppStore.getState();
        
        let newIndicators = usersTyping;
        
        if (userTyping) {
          let alreadyTyping = false;
          newIndicators.forEach((indicator) => {
            if (indicator.userData._id === userData._id && chatId == indicator.chatId) alreadyTyping = true;
          })
          
          if (!alreadyTyping) {
            newIndicators = [{ userData, chatId }, ...newIndicators];
          }
        } else {
          newIndicators = newIndicators.filter((indicator) => indicator.userData._id !== userData._id && indicator.chatId !== chatId);
        }
        
        setUsersTyping(newIndicators);
      };

      socket.current.on("event:chat:left", handleMemberLeaving);
      socket.current.on("event:chat:deleted", handleGroupChatDelete);
      socket.current.on("event:chat:receive", handleReceiveMessage);
      socket.current.on("event:chat:added", handleMemberAdded);
      socket.current.on("event:chat:showTyping", handleUserTyping);      

      // Cleanup function
      return () => {
        if (socket.current) {
          socket.current.off("event:chat:receive");
          socket.current.off("event:chat:left");
          socket.current.off("event:chat:deleted");
          socket.current.off("event:chat:added");
          socket.current.off("event:chat:showTyping", handleUserTyping);      

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
