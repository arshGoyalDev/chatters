"use client";

import useAppStore from "@/store";

import { useEffect, useRef } from "react";

import Message from "./Message";

const MessagesContainer = ({
  chatInfoVisible,
}: {
  chatInfoVisible: boolean;
}) => {
  const { messages, userInfo } = useAppStore();
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    console.log(messages);
    console.log(userInfo);

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [messages, userInfo]);

  return (
    <div
      id="messages-container"
      className={`scrollbar-invisible flex-1 overflow-y-auto`}
    >
      <div
        id="messages"
        className={`flex flex-col w-[90%] max-w-[1000px] mx-auto gap-2 p-6 lg:py-10 ${
          chatInfoVisible ? "lg:px-10" : "px-0"
        } 2xl:px-0`}
      >
        {messages.map((message) => {
          return (
            <Message key={message._id} message={message} userInfo={userInfo} />
          );
        })}
      </div>

      {/* {renderMessages()} */}
      <div ref={scrollRef} />
    </div>
  );
};
export default MessagesContainer;
