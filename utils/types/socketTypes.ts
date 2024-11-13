interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
}

interface ClientToServerEvents {
  hello: string;
}

interface SocketType extends ServerToClientEvents, ClientToServerEvents {}

export type { SocketType };
