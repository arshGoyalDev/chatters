"use client";

import useAppStore from "@/store";

import { useEffect, useRef } from "react";

import Message from "./Message";
import GroupMessage from "./GroupMessage";
import { useSocket } from "@/context";
import { HOST } from "@/utils/constants";

const MessagesContainer = ({
  chatInfoVisible,
}: {
  chatInfoVisible: boolean;
}) => {
  const { messages, chatType } = useAppStore();
  const socket = useSocket();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div id="messages-container" className={`flex-1 overflow-y-auto`}>
      <div
        id="messages"
        className={`flex flex-col w-[90%] max-w-[1000px] mx-auto gap-4 p-6 lg:py-10 ${
          chatInfoVisible ? "lg:px-10" : "px-0"
        } 2xl:px-0`}
      >
        {messages.map((message) => {
          return chatType === "personal" ? (
            <Message key={message._id} message={message} />
          ) : (
            <GroupMessage key={message._id} message={message} />
          );
        })}
        {socket?.typingData.isTyping && (
          <div className="flex gap-2">
            {chatType === "group" && (
              <>
                {socket?.typingData.userTyping.profilePic ? (
                  <div className="min-w-8 w-8 h-8 rounded-md overflow-hidden border-2 border-zinc-800">
                    <img
                      src={`${HOST}/${socket?.typingData.userTyping.profilePic}`}
                      alt={socket.typingData.userTyping.name}
                    />
                  </div>
                ) : (
                  <div className="grid place-content-center w-8 h-8 border-2 border-zinc-800 rounded-md">
                    <span className="fill-zinc-700">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                )}
              </>
            )}
            <div className="flex flex-col gap-2">
              <div className="w-fit flex gap-2 items-center py-4 px-4 bg-zinc-900 bg-opacity-40 border-2 border-zinc-800 rounded-lg">
                <div className="w-2 h-2 bg-zinc-700 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-zinc-700 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-zinc-700 rounded-full animate-pulse"></div>
              </div>
              {chatType === "personal" && (
                <div className="font-bold">
                  {socket.typingData.userTyping.name}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div ref={scrollRef} />
    </div>
  );
};
export default MessagesContainer;
