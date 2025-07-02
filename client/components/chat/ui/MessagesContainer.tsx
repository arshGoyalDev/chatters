"use client";

import useAppStore from "@/store";

import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

import Message from "../message";

import dayjs from "dayjs";

import { Message as MessageType, UserInfo } from "@/utils/types";
import Image from "next/image";
import { HOST } from "@/utils/constants";

const MessagesContainer = ({
  chatInfoVisible,
}: {
  chatInfoVisible: boolean;
}) => {
  const { messages, chatData, usersTyping } = useAppStore();
  const [ currentChatUsersTyping, setCurrentChatUsersTyping] = useState<
    {
      userData: UserInfo;
      chatId: string
      }[]
    >([])
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollToMessageId, setScrollToMessageId] = useState<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages, currentChatUsersTyping]);

  useEffect(() => {
    let usersForCurrentChat: {
      userData: UserInfo;
      chatId: string
      }[] = [];

    usersTyping.forEach((user) => {
      if (user.chatId === chatData?._id) usersForCurrentChat.push(user);
    });

    setCurrentChatUsersTyping(usersForCurrentChat);

    console.log(usersTyping);
  }, [usersTyping])

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
            scrollToMessageId={scrollToMessageId}
            setScrollToMessageId={setScrollToMessageId}
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

        {currentChatUsersTyping.length !== 0 && (

          <div className="flex gap-2 my-3">
            {chatData?.chatType === "group" && (
              <div className="flex">
                {currentChatUsersTyping.length >= 2 ? (
                  <>
                    <div key={currentChatUsersTyping[0].userData._id} className="relative min-w-8 w-8 h-8 rounded-md border-2 border-zinc-800 overflow-hidden">
                      {currentChatUsersTyping[0].userData.profilePic ? (
                        <Image
                        src={`${HOST}/${currentChatUsersTyping[0].userData.profilePic}`}
                        fill
                        sizes="100%"
                        alt={`${currentChatUsersTyping[0].userData.firstName} ${currentChatUsersTyping[0].userData.lastName}`}
                        priority />
                      ) : (
                        <div className="grid place-content-center w-full h-full">
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
                    </div>
                    <div key={currentChatUsersTyping[1].userData._id} className="relative bg-zinc-950 -ml-4 z-10 min-w-8 w-8 h-8 rounded-md border-2 border-zinc-800 overflow-hidden">
                      {currentChatUsersTyping[1].userData.profilePic ? (
                        <Image
                        src={`${HOST}/${currentChatUsersTyping[1].userData.profilePic}`}
                        fill
                        sizes="100%"
                        alt={`${currentChatUsersTyping[1].userData.firstName} ${currentChatUsersTyping[1].userData.lastName}`}
                        priority />
                      ) : (
                        <div className="grid place-content-center w-full h-full">
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
                    </div>
                  </>
                ) : (
                  <div key={currentChatUsersTyping[0].userData._id} className="relative min-w-8 w-8 h-8 rounded-md border-2 border-zinc-800 overflow-hidden">
                    {currentChatUsersTyping[0].userData.profilePic ? (
                      <Image
                      src={`${HOST}/${currentChatUsersTyping[0].userData.profilePic}`}
                      fill
                      sizes="100%"
                      alt={`${currentChatUsersTyping[0].userData.firstName} ${currentChatUsersTyping[0].userData.lastName}`}
                      priority />
                    ) : (
                      <div className="grid place-content-center w-full h-full">
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
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-1 py-3 px-4 bg-primary bg-opacity-5 border-2 w-fit rounded-lg border-primary border-opacity-20 text-primary message-sender font-semibold">
              <span className="w-[6px] h-[6px] rounded-full bg-primary animate-bounce"></span>
              <span className="w-[6px] h-[6px] rounded-full bg-primary animate-bounce"
                style={{
                  animationDelay: "200ms",
                }}></span>
              <span className="w-[6px] h-[6px] rounded-full bg-primary animate-bounce"
                style={{
                  animationDelay: "400ms",
                }}></span>
            </div>
          </div>
        )}
      </div>
      <div ref={scrollRef} />
    </div>
  );
};

export default MessagesContainer;
