"use client";

import { ReactElement } from "react";

import SocketProvider from "./SocketContext";
import ChatListProvider from "./ChatListContext";
import ErrorProvider from "./ErrorContext";
import LightboxProvider from "./LightboxContext";

const ContextContainer = ({ children }: { children: ReactElement }) => {
  return (
    <ChatListProvider>
      <SocketProvider>
        <ErrorProvider>
          <LightboxProvider>{children}</LightboxProvider>
        </ErrorProvider>
      </SocketProvider>
    </ChatListProvider>
  );
};
export default ContextContainer;
