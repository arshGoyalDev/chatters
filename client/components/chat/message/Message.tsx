import type { Message } from "@/utils/types";

import dayjs from "dayjs";

import { HOST } from "@/utils/constants";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import useAppStore from "@/store";
import DisplayFiles from "./DisplayFiles";

import Image from "next/image";

const Message = ({
  message,
  showSender,
}: {
  message: Message;
  showSender: boolean;
}) => {
  const { userInfo, chatData } = useAppStore();

  return (
    <>
      {(message.messageType === "file" || message.messageType === "text") && (
        <div
          className={`flex flex-col gap-2 ${
            chatData?.chatType === "group"
              ? showSender
                ? "mt-4"
                : "mt-2"
              : "mt-3"
          } ${
            userInfo._id === message.sender._id ? "items-end" : "items-start"
          }`}
        >
          <div className={`flex gap-2 max-w-[80%] lg:max-w-[60%]`}>
            {showSender ? (
              <>
                {chatData?.chatType === "group" &&
                  userInfo._id !== message.sender._id &&
                  (message.sender.profilePic ? (
                    <div className="relative min-w-8 w-8 h-8 rounded-md overflow-hidden border-2 border-zinc-800">
                      <Image
                        src={`${HOST}/${message.sender.profilePic}`}
                        fill
                        sizes="100%"
                        alt={`${message.sender.firstName} ${message.sender.lastName}`}
                        className="w-full h-full"
                        priority
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
                  ))}
              </>
            ) : (
              <>
                {chatData?.chatType === "group" && (
                  <div className="min-w-8 w-8 h-8"></div>
                )}
              </>
            )}

            <div
              className={`relative flex flex-col ${
                userInfo._id === message.sender._id && "items-end"
              } gap-1`}
            >
              {showSender && (
                <div
                  className={`flex gap-2 ${
                    userInfo._id === message.sender._id && "justify-end"
                  }`}
                >
                  {chatData?.chatType === "group" &&
                    userInfo._id !== message.sender._id && (
                      <div className="font-bold">
                        {`${message.sender.firstName} ${message.sender.lastName}`}
                      </div>
                    )}
                </div>
              )}
              {message.fileUrls && (
                <DisplayFiles
                  fileUrls={message.fileUrls}
                  sender={message.sender._id === userInfo._id}
                />
              )}

              {message.content && (
                <div
                  className={`relative pr-16 w-fit leading-6 ${
                    userInfo._id !== message.sender._id
                      ? "bg-primary bg-opacity-5 border-primary border-opacity-20 text-primary message-sender font-semibold"
                      : "bg-zinc-900 bg-opacity-40 border-zinc-800 text-white message-receiver font-medium"
                  } py-2 px-4 rounded-lg break-words border-2`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </Markdown>
                  <div
                    className={`absolute bottom-2 right-2 text-xs font-semibold ${
                      userInfo._id !== message.sender._id
                        ? "text-primary/40"
                        : "text-white/30"
                    }`}
                  >
                    {dayjs(message.timeStamp).format("h:mm A  ")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {(message.messageType === "leaving" ||
        message.messageType === "create" ||
        message.messageType === "add") && (
        <div className="flex justify-center my-1.5 w-full">
          <div className="bg-zinc-900 w-fit max-w-[400px] text-center bg-opacity-40 text-sm py-1.5 px-3 border-2 border-zinc-800 text-zinc-400 rounded-lg">
            {message.content}
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
