import { ReactElement } from "react";

import SocketProvider from "./SocketContext";
import ChatListProvider from "./ChatListContext";
import ErrorProvider from "./ErrorContext";

const ContextContainer = ({ children }: { children: ReactElement }) => {
  return (
    <ChatListProvider>
      <SocketProvider>
        <ErrorProvider>{children}</ErrorProvider>
      </SocketProvider>
    </ChatListProvider>
  );
};
export default ContextContainer;
