/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import useAppStore from "@/store";

import { io, Socket } from "socket.io-client";

import { HOST } from "@/utils/constants";

import {
  ChatData,
  Group,
  GroupMessage,
  Message,
  SocketContextType,
  UserInfo,
} from "@/utils/types";

import { useChatList } from "./ChatListContext";

const SocketContext = createContext<SocketContextType | null>(null);

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: ReactElement }) => {
  const chatList = useChatList();
  const socket = useRef<Socket | null>(null);

  const { userInfo, addMessage } = useAppStore();

  useEffect(() => {
    if (userInfo.email !== "") {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceiveMessage = (message: Message) => {
        const { chatData, chatType } = useAppStore.getState();
        if (
          typeof message.sender !== "string" &&
          typeof message.recipient !== "string"
        ) {
          if (
            chatData?.chatMembers[0]._id === message.sender._id ||
            chatData?.chatMembers[0]._id === message.recipient._id
          ) {
            if (chatType === "personal") {
              addMessage(message);
            }
            // if (chatData.)
          }
        }
      };

      const handleReceiveGroupMessage = (message: GroupMessage) => {
        const { chatData } = useAppStore.getState();

        if (chatData?.chatId === message.groupId) {
          addMessage(message);
        }
      };

      const handleGroupDelete = (groupDetails: {
        groupId: string;
        groupName: string;
        groupAdmin: string;
      }) => {
        const { chatData, setChatData, setChatType } = useAppStore.getState();

        if (chatData?.chatId === groupDetails.groupId) {
          setChatData(null);
          setChatType(null);
        }

        chatList?.getGroups();

        alert(
          `${groupDetails.groupName} was deleted by admin ${groupDetails.groupAdmin}`
        );
      };

      const handleMemberLeaving = (data: {
        leavingMemberId: string;
        messageData: Message;
        updatedGroup: Group;
      }) => {
        const { chatData, setChatData, setChatType } = useAppStore.getState();
        const { leavingMemberId, messageData, updatedGroup } = data;

        chatList?.getGroups();

        if (
          userInfo._id === leavingMemberId &&
          chatData?.chatId === updatedGroup._id
        ) {
          setChatData(null);
          setChatType(null);
        }

        if (
          userInfo._id !== leavingMemberId &&
          chatData?.chatId === updatedGroup._id
        ) {
          const newChat: ChatData = {
            chatName: updatedGroup.groupName,
            chatPic: updatedGroup.groupPic,
            chatStatus: updatedGroup.groupDescription,
            chatMembers: updatedGroup.groupMembers,
            chatId: updatedGroup._id,
            chatAdmin: updatedGroup.groupAdmin,
            chatUpdatedAt: updatedGroup.updatedAt,
            chatCreatedAt: updatedGroup.createdAt,
          };

          setChatData(newChat);
          addMessage(messageData);
        }
      };

      socket.current.on("memberLeft", handleMemberLeaving);
      socket.current.on("groupDeleted", handleGroupDelete);
      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("receiveGroupMessage", handleReceiveGroupMessage);

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket };
export default SocketProvider;
