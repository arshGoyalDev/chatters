import { ReactElement } from "react";

import SocketProvider from "./SocketContext";
import ChatListProvider from "./ChatListContext";

const ContextContainer = ({ children }: { children: ReactElement }) => {
  return (
    <ChatListProvider>
      <SocketProvider>{children}</SocketProvider>
    </ChatListProvider>
  );
};
export default ContextContainer;
