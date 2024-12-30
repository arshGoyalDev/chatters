import { Socket } from "socket.io-client";
import { UserInfo } from "./authTypes";

interface SocketContextType {
  socket: Socket | null;
  typingData: {
    isTyping: boolean,
    userTyping: {
      profilePic: string,
      name: string,
    };
  }
}

export type { SocketContextType };
