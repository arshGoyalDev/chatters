/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useAppStore from "@/store";

import { HOST } from "@/utils/constants";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ChatMember from "./ChatMember";
import File from "./File";
import { count } from "console";

const ChatInfo = ({
  setChatInfoVisible,
}: {
  setChatInfoVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const { chatData, chatType, messages } = useAppStore();
  const [filesLength, setFilesLength] = useState(0);

  useEffect(() => {
    let count = 0;
    messages.map((message) => {
      if (message.messageType === "file") {
        count++;
        // setFilesLength(count);
      }
    });

    setFilesLength(count);
  }, [messages]);

  return (
    <div className="w-full xl:min-w-[400px] xl:w-[30vw] h-screen flex flex-col items-center py-7 bg-zinc-900 border-l-2 border-zinc-950 overflow-y-auto">
      <div className="flex justify-end w-full mb-10 px-10">
        <div className="bg-zinc-800 rounded-lg">
          <button
            onClick={() => setChatInfoVisible(false)}
            className="p-1.5 stroke-white rotate-45"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12H18"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full px-12">
        <div className="flex items-center flex-col gap-6">
          <div className="w-52 h-52 rounded-xl overflow-hidden">
            {chatData?.chatPic ? (
              <img
                src={`${HOST}/${chatData?.chatPic}`}
                alt={chatData?.chatName}
              />
            ) : (
              <div className="grid place-content-center bg-zinc-800 h-full">
                <span className="fill-zinc-700">
                  <svg
                    width="150"
                    height="100"
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
          <h2 className="px-10 font-bold text-4xl text-center">
            {chatData?.chatName}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-zinc-600 font-bold uppercase">
              {chatType === "personal" ? "status" : "description"}
            </h2>
            <Markdown
              remarkPlugins={[remarkGfm]}
              className="font-semibold mt-1"
            >
              {chatData?.chatStatus}
            </Markdown>
          </div>
          {chatType === "personal" && (
            <div>
              <h2 className="text-zinc-600 font-bold uppercase">Email</h2>
              <p className="font-semibold mt-1">
                {chatData?.chatMembers[0].email}
              </p>
            </div>
          )}
        </div>

        {filesLength !== 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-zinc-600 font-bold uppercase">
              Files ( {filesLength} )
            </h2>
            <div className="flex flex-col gap-2">
              {messages.map(
                (message) =>
                  message.messageType === "file" && (
                    <File key={message._id} filePath={message.fileUrl} />
                  )
              )}
            </div>
          </div>
        )}

        {chatType === "group" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-zinc-600 font-bold uppercase">Group Admin</h2>
              {chatData?.chatAdmin && (
                <ChatMember
                  key={chatData?.chatAdmin?._id}
                  member={chatData?.chatAdmin}
                  admin={true}
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-zinc-600 font-bold uppercase">
                Group Members ( {chatData?.chatMembers.length} )
              </h2>
              <div className="flex flex-col gap-2">
                {chatData?.chatMembers.map((member) => (
                  <ChatMember key={member._id} member={member} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatInfo;
