"use client";

import useAppStore from "@/store";

import { Fragment, ReactNode, useEffect, useRef } from "react";

import Message from "../message";

import dayjs from "dayjs";

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
    let lastSender: string | null = null;

    return messages.map((message: MessageType) => {
      const messageDate = dayjs(message.timeStamp).format('MMM D, YYYY');
      const messageSender = message.sender._id;

      const showDate = messageDate !== lastDate;
      const showSender = lastSender ? messageSender !== lastSender : true;

      if (message.messageType === "text" || message.messageType === "file") {
        lastSender = messageSender;
      }
      lastDate = messageDate;

      return (
        <Fragment key={message._id}>
          {showDate && (
            <div className="flex justify-center items-center gap-2 mt-4 mb-1.5 w-full">
              <div className="w-full h-0.5 bg-zinc-900"></div>
              <div className="w-fit text-nowrap text-sm text-zinc-500">
                {messageDate}
              </div>
              <div className="w-full h-0.5 bg-zinc-900"></div>
            </div>
          )}
          <Message
            message={message}
            showSender={
              chatData?.chatType === "group"
                ? showDate
                  ? true
                  : showSender
                : false
            }
          />
        </Fragment>
      );
    });
  };

  return (
    <div id="messages-container" className={`flex-1 overflow-y-auto`}>
      <div
        id="messages"
        className={`flex flex-col w-[90%] max-w-[1000px] mx-auto p-6 pt-4 lg:pb-10 lg:pt-6 ${
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
