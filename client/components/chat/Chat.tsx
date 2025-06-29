"use client";

import { useEffect, useState } from "react";

import {
  EmptyChat,
  MessageBar,
  ChatHeader,
  ChatInfo,
  MessagesContainer,
} from "./ui";

import useAppStore from "@/store";

import { apiClient } from "@/lib/api-client";

import { GET_CHAT_MESSAGES_ROUTE } from "@/utils/constants";

import { useError } from "@/context";

const Chat = () => {
  const errorContext = useError();
  const { messages, chatData, setMessages } = useAppStore();
  const [loading, setLoading] = useState(true);

  const [chatInfoVisible, setChatInfoVisible] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_CHAT_MESSAGES_ROUTE,
          { chatId: chatData?._id },
          { withCredentials: true },
        );

        if (response.data.messages.length !== 0) {
          setMessages(response.data.messages);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        errorContext?.setErrorMessage("Failed to retrieve messages");
      }
    };

    if (chatData) getMessages();
  }, [setMessages, chatData]);

  useEffect(() => {
    setLoading(true);
  }, [chatData]);

  return (
    <main
      className={`fixed ${
        chatData && "z-30 md:z-0"
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

              {loading ? (
                <div
                  className={`flex-1 gap-8 flex flex-col w-[90%] max-w-[1000px] mx-auto p-6 lg:py-10 ${
                    chatInfoVisible ? "lg:px-10" : "px-0"
                  } 2xl:px-0`}
                >
                  <div className="flex flex-col gap-2 items-end ">
                    <div className="w-72 h-8 rounded-md bg-zinc-900/50 animate-pulse"></div>
                    <div className="w-96 h-8 rounded-md bg-zinc-900/50 animate-pulse"></div>
                  </div>
                  <div className="flex flex-row gap-2">
                    {chatData.chatType === "group" && (
                      <div className="min-w-8 w-8 h-8 rounded-md bg-zinc-900/50 animate-pulse"></div>
                    )}
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="w-32 h-5 rounded-md bg-zinc-900/50 animate-pulse"></div>
                      <div className="w-80 h-8 rounded-md bg-zinc-900/50 animate-pulse"></div>
                      <div className="w-[80%] lg:w-[60%] h-28 rounded-md bg-zinc-900/50 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.length !== 0 ? (
                    <MessagesContainer chatInfoVisible={chatInfoVisible} />
                  ) : (
                    <div className="h-full grid place-content-center text-4xl font-bold">
                      {"No Messages".toLocaleUpperCase()}
                    </div>
                  )}
                </>
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
