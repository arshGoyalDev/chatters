import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

export type { SocketContextType };
