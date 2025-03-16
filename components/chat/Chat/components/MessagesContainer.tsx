"use client";

import useAppStore from "@/store";

import { ReactNode, useEffect, useRef } from "react";

import Message from "./Message";
import moment from "moment";
import { Message as MessageType } from "@/utils/types";

const MessagesContainer = ({
  chatInfoVisible,
}: {
  chatInfoVisible: boolean;
}) => {
  const { messages, chatData } = useAppStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  const renderMessages: () => ReactNode = () => {
    let lastDate: string | null = null;
    // return selectedChatMessages.map((message) => {
    return messages.map((message: MessageType) => {
      const messageDate = moment(message.timeStamp).format("LL");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <>
          {showDate && (
            <div className="flex justify-center items-center gap-2 my-4 w-full">
              <div className="w-full h-0.5 bg-zinc-800"></div>
              <div className="w-fit text-nowrap text-sm text-zinc-500">{messageDate}</div>
              <div className="w-full h-0.5 bg-zinc-800"></div>
            </div>
          )}
          <Message key={message._id} message={message} />
        </>
      );
    });
  };

  return (
    <div id="messages-container" className={`flex-1 overflow-y-auto`}>
      <div
        id="messages"
        className={`flex flex-col w-[90%] max-w-[1000px] mx-auto gap-4 p-6 lg:py-10 ${
          chatInfoVisible ? "lg:px-10" : "px-0"
        } 2xl:px-0`}
      >
        {renderMessages()}
      </div>
      <div ref={scrollRef} />
    </div>
  );
};

export default MessagesContainer;
