import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useAppStore from "@/store";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ChatMember from "./ChatMember";
import File from "./File";

import { useSocket } from "@/context";
import { HOST } from "@/utils/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ChatInfo = ({
  setChatInfoVisible,
}: {
  setChatInfoVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const socket = useSocket();
  const router = useRouter();

  const { chatData, messages, userInfo } = useAppStore();
  const [filesLength, setFilesLength] = useState(0);

  useEffect(() => {
    let count = 0;
    messages.map((message) => {
      if (message.messageType === "file") {
        count++;
      }
    });

    setFilesLength(count);
  }, [messages]);

  const deleteGroup = async () => {
    socket?.socket?.emit("event:chat:delete", chatData?._id);
  };

  const leaveGroup = async () => {
    socket?.socket?.emit("event:chat:leave", {
      chatId: chatData?._id,
      leavingMember: userInfo,
    });
  };

  return (
    <div className="w-full xl:min-w-[400px] xl:w-[30vw] h-screen flex flex-col items-center py-7 bg-zinc-900/60 border-l-2 border-zinc-950 overflow-y-auto">
      <div className="flex justify-end w-full mb-8 px-10">
        <div className="bg-zinc-900 rounded-lg">
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
        <div className="flex items-center flex-col gap-4">
          <div className="w-40 h-40 rounded-xl overflow-hidden">
            {(
              chatData?.chatType === "personal"
                ? userInfo._id === chatData.chatAdmin._id
                  ? chatData.chatMembers[0].profilePic
                  : chatData.chatAdmin.profilePic
                : chatData?.chatPic
            ) ? (
              <div className="relative w-40 h-40">
                <Image src={chatData?.chatType === "personal"
                  ? `${HOST}/${userInfo._id === chatData.chatAdmin._id
                    ? chatData.chatMembers[0].profilePic
                    : chatData.chatAdmin.profilePic
                  }`
                  : `${HOST}/${chatData?.chatPic}`} fill sizes="100%"
                  alt={chatData?.chatName || ""} className="w-full h-full" priority />
              </div>
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
          <h2 className="px-10 font-bold text-2xl text-center">
            {chatData?.chatType === "personal"
              ? userInfo._id === chatData.chatAdmin._id
                ? `${chatData.chatMembers[0].firstName} ${chatData.chatMembers[0].lastName}`
                : `${chatData.chatAdmin.firstName} ${chatData.chatAdmin.lastName}`
              : chatData?.chatName}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-zinc-600 text-sm font-bold uppercase">
              {chatData?.chatType === "personal" ? "status" : "description"}
            </h2>
            <Markdown
              remarkPlugins={[remarkGfm]}
              className="font-semibold mt-1"
            >
              {chatData?.chatType === "personal"
                ? userInfo._id === chatData.chatAdmin._id
                  ? chatData.chatMembers[0].status
                  : chatData.chatAdmin.status
                : chatData?.chatDescription}
            </Markdown>
          </div>
          {chatData?.chatType === "personal" && (
            <div>
              <h2 className="text-zinc-600 text-sm font-bold uppercase">
                Email
              </h2>
              <p className="font-semibold mt-1">
                {chatData?.chatMembers[0].email}
              </p>
            </div>
          )}
        </div>

        {filesLength !== 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-zinc-600 text-sm font-bold uppercase">
              Files ( {filesLength} )
            </h2>
            <div className="flex flex-col gap-2">
              {messages.map(
                (message) =>
                  message.messageType === "file" &&
                  message.fileUrls &&
                  message.fileUrls.map((fileUrl, index) => (
                    <File key={index} filePath={fileUrl} />
                  ))
                ,
              )}
            </div>
          </div>
        )}

        {chatData?.chatType === "group" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-zinc-600 text-sm font-bold uppercase">
                Group Admin
              </h2>
              {chatData?.chatAdmin && (
                <ChatMember
                  key={chatData?.chatAdmin?._id}
                  member={chatData?.chatAdmin}
                  admin={true}
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-zinc-600 text-sm font-bold uppercase">
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

        {chatData?.chatType === "group" &&
          userInfo._id === chatData?.chatAdmin?._id && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  router.push("/chat?add-member=true");
                }}
                className="flex items-center justify-between py-3 px-3 border-2 border-zinc-700 border-opacity-40 rounded-lg"
              >
                <span className="font-semibold">Add Member/s</span>
                <span className="stroke-white">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5 19.5H14.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 21.5V17.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <button
                onClick={deleteGroup}
                className="flex items-center justify-between bg-red-500 bg-opacity-5 py-3 px-3 border-2 border-red-500 border-opacity-40 rounded-lg"
              >
                <span className="font-semibold text-red-500">Delete Group</span>
                <span className="stroke-red-500">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.97 10H3.96997V18C3.96997 21 4.96997 22 7.96997 22H15.97C18.97 22 19.97 21 19.97 18V10Z"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.5 7V8C21.5 9.1 20.97 10 19.5 10H4.5C2.97 10 2.5 9.1 2.5 8V7C2.5 5.9 2.97 5 4.5 5H19.5C20.97 5 21.5 5.9 21.5 7Z"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}

        {chatData?.chatType === "group" &&
          userInfo._id !== chatData?.chatAdmin?._id && (
            <button
              onClick={leaveGroup}
              className="flex items-center justify-between bg-red-500 bg-opacity-5 py-3 px-3 border-2 border-red-500 border-opacity-40 rounded-lg"
            >
              <span className="font-semibold text-red-500">Leave Group</span>
              <span className="stroke-red-500">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12H3.62"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          )}
      </div>
    </div>
  );
};
export default ChatInfo;
