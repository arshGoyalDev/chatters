import { Socket } from "socket.io-client";
import { UserInfo } from "./authTypes";

interface SocketContextType {
  socket: Socket | null;
}

export type { SocketContextType };
