"use client";

import { useEffect, useState } from "react";

import {
  EmptyChat,
  MessageBar,
  ChatHeader,
  ChatInfo,
  MessagesContainer,
} from "./components";

import useAppStore from "@/store";

import { apiClient } from "@/lib/api-client";

import { GET_CHAT_MESSAGES_ROUTE } from "@/utils/constants";

import { useError } from "@/context";

const Chat = () => {
  const errorContext = useError();
  const { messages, chatData, setMessages } = useAppStore();

  const [chatInfoVisible, setChatInfoVisible] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_CHAT_MESSAGES_ROUTE,
          { chatId: chatData?._id },
          { withCredentials: true }
        );

        if (response.data.messages.length !== 0) {
          setMessages(response.data.messages);
        }
      } catch (error) {
        errorContext?.setErrorMessage("Failed to retrieve messages");
      }
    };

    if (chatData) getMessages();
  }, [setMessages, chatData]);

  return (
    <main
      className={`fixed ${
        chatData && "z-[1000] md:z-0"
      } bg-zinc-950 top-0 left-0 md:relative w-full h-screen md:w-[62vw] lg:w-[70vw] xl:w-[75vw] 2xl:w-[80vw] select-none`}
    >
      {chatData ? (
        <>
          <div className="flex">
            <div
              className={`${
                chatInfoVisible ? "hidden xl:flex" : "flex"
              } relative w-full h-screen flex-col`}
            >
              <ChatHeader
                chatInfoVisible={chatInfoVisible}
                setChatInfoVisible={setChatInfoVisible}
              />

              {messages.length !== 0 ? (
                <MessagesContainer chatInfoVisible={chatInfoVisible} />
              ) : (
                <div className="h-full grid place-content-center text-4xl font-bold">
                  {"No Messages".toLocaleUpperCase()}
                </div>
              )}

              <MessageBar />
            </div>
            {chatInfoVisible && (
              <ChatInfo setChatInfoVisible={setChatInfoVisible} />
            )}
          </div>
        </>
      ) : (
        <EmptyChat />
      )}
    </main>
  );
};

export default Chat;
