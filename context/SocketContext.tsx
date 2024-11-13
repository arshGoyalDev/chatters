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
import { SocketContextType } from "@/utils/types";

const SocketContext = createContext<SocketContextType | null>(null);

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: ReactElement }) => {
  const socket = useRef<Socket | null>(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo.email !== "") {
      socket.current = io(HOST, {
        withCredentials: true,
        query: {userId: userInfo.userId},
      })

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      return () => {
        socket.current?.disconnect();
      }
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{socket: socket.current}}>
      {children}
    </SocketContext.Provider>
  )
};

export { useSocket };
export default SocketProvider;
