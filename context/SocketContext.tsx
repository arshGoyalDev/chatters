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

import { GroupMessage, Message, SocketContextType } from "@/utils/types";

const SocketContext = createContext<SocketContextType | null>(null);

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: ReactElement }) => {
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
        const { chatData } = useAppStore.getState();
        if (
          typeof message.sender !== "string" &&
          typeof message.recipient !== "string"
        ) {
          if (
            chatData?.chatMembers[0]._id === message.sender._id ||
            chatData?.chatMembers[0]._id === message.recipient._id
          ) {
            addMessage(message);
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
        const { chatData,setChatData, setChatType } = useAppStore.getState();

        if (chatData?.chatId === groupDetails.groupId) {
          setChatData(null);
          setChatType(null);
        }

        alert(
          `${groupDetails.groupName} was deleted by admin ${groupDetails.groupAdmin}`
        );
      };

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
