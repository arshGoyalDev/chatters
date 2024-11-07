"use client";

import { useEffect, useState } from "react";
import { EmptyChat, MessageBar, ChatHeader, ChatInfo } from "./components";

import useAppStore from "@/store";

const Chat = () => {
  const { chatType } = useAppStore();
  const [chatInfoVisible, setChatInfoVisible] = useState(false);

  useEffect(() => console.log(chatInfoVisible), [chatInfoVisible]);

  return (
    <main className="fixed top-0 left-0 md:relative w-full h-screen md:w-[62vw] lg:w-[70vw] xl:w-[75vw] 2xl:w-[80vw]">
      {chatType ? (
        <>
          <div className="flex">
            <div className="relative w-full h-screen">
              <ChatHeader
                chatInfoVisible={chatInfoVisible}
                setChatInfoVisible={setChatInfoVisible}
              />
            <MessageBar />
            </div>
            {chatInfoVisible && <ChatInfo />}
          </div>
        </>
      ) : (
        <EmptyChat />
      )}
    </main>
  );
};

export default Chat;
