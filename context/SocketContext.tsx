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

import {
  // ChatData,
  // Group,
  // GroupMessage,
  Message,
  SocketContextType,
} from "@/utils/types";

import { useChatList } from "./ChatListContext";

const SocketContext = createContext<SocketContextType | null>(null);

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: ReactElement }) => {
  const chatList = useChatList();
  const socket = useRef<Socket | null>(null);

  const { userInfo, addMessage } = useAppStore();

  useEffect(() => {
    // Don't attempt to connect if user is not logged in
    if (userInfo.email === "") {
      return;
    }

    if (userInfo.email !== "") {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceiveMessage = (message: Message) => {
        const { chatData } = useAppStore.getState();

        const isCurrentChat = chatData?._id === message.recipient;

        chatList?.getChats();
        
        if (isCurrentChat) {
          addMessage(message);
        }
      };

      // const handleGroupDelete = (groupDetails: {
      //   groupId: string;
      //   groupName: string;
      //   groupAdmin: string;
      // }) => {
      //   const { chatData, setChatData, setChatType } = useAppStore.getState();

      //   if (chatData?.chatId === groupDetails.groupId) {
      //     setChatData(null);
      //     setChatType(null);
      //   }

      //   chatList?.getGroups();

      //   alert(
      //     `${groupDetails.groupName} was deleted by admin ${groupDetails.groupAdmin}`
      //   );
      // };

      // const handleMemberLeaving = (data: {
      //   leavingMemberId: string;
      //   messageData: Message;
      //   updatedGroup: Group;
      // }) => {
      //   const { chatData, setChatData, setChatType } = useAppStore.getState();
      //   const { leavingMemberId, messageData, updatedGroup } = data;

      //   chatList?.getGroups();

      //   if (
      //     userInfo._id === leavingMemberId &&
      //     chatData?.chatId === updatedGroup._id
      //   ) {
      //     setChatData(null);
      //     setChatType(null);
      //   }

      //   if (
      //     userInfo._id !== leavingMemberId &&
      //     chatData?.chatId === updatedGroup._id
      //   ) {
      //     const newChat: ChatData = {
      //       chatName: updatedGroup.groupName,
      //       chatPic: updatedGroup.groupPic,
      //       chatStatus: updatedGroup.groupDescription,
      //       chatMembers: updatedGroup.groupMembers,
      //       chatId: updatedGroup._id,
      //       chatAdmin: updatedGroup.groupAdmin,
      //       chatUpdatedAt: updatedGroup.updatedAt,
      //       chatCreatedAt: updatedGroup.createdAt,
      //     };

      //     setChatData(newChat);
      //     addMessage(messageData);
      //   }
      // };

      // Register event handlers
      // socket.current.on("memberLeft", handleMemberLeaving);
      // socket.current.on("groupDeleted", handleGroupDelete);
      socket.current.on("receiveMessage", handleReceiveMessage);

      // Cleanup function
      return () => {
        if (socket.current) {
          // Remove all event listeners
          socket.current.off("connect");
          socket.current.off("connect_error");
          socket.current.off("disconnect");
          // socket.current.off("memberLeft");
          // socket.current.off("groupDeleted");
          socket.current.off("receiveMessage");

          // Disconnect socket
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
