"use client";

import useAppStore from "@/store";

import { useEffect, useRef, useState } from "react";

import Message from "./Message";

import moment from "moment";

const MessagesContainer = ({
  chatInfoVisible,
}: {
  chatInfoVisible: boolean;
}) => {
  const { messages, userInfo, chatType } = useAppStore();
  const scrollRef = useRef();

  useEffect(() => {
    console.log(messages);

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const renderMessages = () => {
    let lastDate: string = "";

    return (
      <div
        ref={scrollRef}
        id="messages"
        className={`scrollbar-invisible h-[84vh] overflow-y-auto flex flex-col w-[90%] max-w-[1000px] mx-auto gap-2 p-6 lg:py-10 ${
          chatInfoVisible ? "lg:px-10" : "px-0"
        } 2xl:px-0`}
      >
        {messages.map((message, index) => {
          const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
          const showDate = messageDate !== lastDate;
          lastDate = messageDate;

          return (
            <div key={index}>
              {showDate && (
                <div className="font-semibold text-base w-fit my-4 mx-auto text-center">
                  {moment(message.timeStamp).format("LL")}
                </div>
              )}

              {chatType === "personal" && renderPersonalMessages()}
            </div>
          );
        })}
      </div>
    );
  };

  const renderPersonalMessages = () => {
    return messages.map((message) => {
      return (
        <Message key={message._id} message={message} userInfo={userInfo} />
      );
    });
  };

  return (
    <div
      id="messages-container"
      className={`scrollbar-invisible flex-1 flex justify-center items-center overflow-y-auto`}
    >
      <>
        {messages.length !== 0 ? (
          <div
            ref={scrollRef}
            id="messages"
            className={`scrollbar-invisible h-[84vh] overflow-y-auto flex flex-col w-[90%] max-w-[1000px] mx-auto gap-2 p-6 lg:py-10 ${
              chatInfoVisible ? "lg:px-10" : "px-0"
            } 2xl:px-0`}
          >
            {renderMessages()}
          </div>
        ) : (
          <div className="text-4xl font-bold">
            {"No Messages".toLocaleUpperCase()}
          </div>
        )}
      </>
    </div>
  );
};
export default MessagesContainer;
