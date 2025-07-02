"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import useAppStore from "@/store";

import { useError, useSocket } from "@/context";

import { SelectFileMenu } from "../message";

import { apiClient } from "@/lib/api-client";

import { HOST, UPLOAD_FILE_ROUTE } from "@/utils/constants";
import Image from "next/image";

const MessageBar = () => {
  const socket = useSocket();
  const errorContext = useError();

  const { chatData, userInfo, messages, replyMessage, setReplyMessage } =
    useAppStore();

  const [message, setMessage] = useState("");

  const [fileMenu, setFileMenu] = useState(false);
  const [filePaths, setFilePaths] = useState<string[] | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setFilePaths(null);
    setFileMenu(false);
  }, [messages]);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      socket?.socket?.emit("event:chat:typing", {
        chatId: chatData?._id,
        userId: userInfo._id,
        isTyping: message !== "",
      });
    }, 1000);

    return () => clearTimeout(typingTimeout);
  }, [message]);

  const sendMessage = async () => {
    const uploadedFilePaths = await uploadFiles();

    setFiles(null);
    setFilePaths(null);

    if (files || message) {
      socket?.socket?.emit("event:chat:send", {
        sender: userInfo._id,
        content: message ? message : "",
        replyMessage: replyMessage?._id ? replyMessage._id : null,
        recipient: chatData?._id,
        fileUrls: uploadedFilePaths.length !== 0 ? uploadedFilePaths : [],
        messageType: files ? "file" : "text",
      });

      socket?.socket?.emit("event:chat:typing", {
        chatId: chatData?._id,
        userId: userInfo._id,
        userTyping: false,
      });
    }

    setReplyMessage(null);
    setMessage("");
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, message]);

  const uploadFiles = async () => {
    if (files) {
      try {
        const formData = new FormData();

        for (let i = 0; i < files!.length; i++) {
          formData.append("files", files![i]);
        }

        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
        });

        return response.data.filePaths;
      } catch (error) {
        errorContext?.setErrorMessage("Failed to upload file");
        return false;
      }
    } else return false;
  };

  return (
    <div className="flex justify-center pt-4 mx-2">
      <div className="w-full max-w-[880px] bg-zinc-900/60 md:pl-2 pr-2 rounded-t-xl border-2 border-zinc-900">
        {replyMessage && (
          <div className="relative bg-zinc-950 flex items-center gap-3 mt-3 mx-1 py-3 px-3 rounded-lg">
            {replyMessage.messageType === "file" && replyMessage.fileUrls && (
              <div className="relative w-10 aspect-square rounded-md overflow-hidden">
                <Image
                  src={`${HOST}/${replyMessage.fileUrls[0]}`}
                  fill
                  sizes="100%"
                  alt={
                    replyMessage.sender.firstName + replyMessage.sender.lastName
                  }
                  className="w-full h-full"
                  priority
                />{" "}
              </div>
            )}

            <div>
              <div className="text-sm text-bold">
                {replyMessage.sender._id === userInfo._id ? (
                  <span className="text-zinc-300">You</span>
                ) : (
                  <span className="text-primary">
                    {replyMessage.sender.firstName}{" "}
                    {replyMessage.sender.lastName}
                  </span>
                )}
              </div>
              <div className="text-semibold text-zinc-100">
                {replyMessage.content.length > 200
                  ? `${replyMessage.content.slice(0, 200)}...`
                  : replyMessage.content}
              </div>
            </div>

            <button
              onClick={() => setReplyMessage(null)}
              className="absolute top-2 right-2 bg-zinc-900/60 rounded-sm p-0.5"
            >
              <div className="stroke-white rotate-45">
                <svg
                  width="20"
                  height="20"
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
              </div>{" "}
            </button>
          </div>
        )}
        <div className="flex items-center gap-3 pr-2 w-full md:gap-0">
          <div className="pt-1 w-full">
            <textarea
              ref={textAreaRef}
              name="message-input"
              id="message-input"
              value={message}
              autoComplete="off"
              autoFocus={true}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              className="scrollbar-invisible w-full py-4 pl-4 pr-2 min-h-16 max-h-32 md:pl-4 md:pr-2 placeholder:text-zinc-500 bg-transparent rounded-lg resize-none"
            />
          </div>

          <div className="relative flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setFileMenu(true)}
              className="p-1 border-2 border-transparent focus:border-zinc-800 rounded-lg"
            >
              <span className="stroke-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.09997 3 4.96997 6.13 4.96997 10V16C4.96997 19.31 7.65997 22 10.97 22"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            {fileMenu && (
              <SelectFileMenu
                setFileMenu={setFileMenu}
                filePaths={filePaths}
                setFilePaths={setFilePaths}
                files={files}
                setFiles={setFiles}
              />
            )}
            <button
              onClick={sendMessage}
              className="p-1 border-2 border-transparent focus:border-zinc-800 rounded-lg"
            >
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-primary"
                    d="M16.1391 2.95907L7.10914 5.95907C1.03914 7.98907 1.03914 11.2991 7.10914 13.3191L9.78914 14.2091L10.6791 16.8891C12.6991 22.9591 16.0191 22.9591 18.0391 16.8891L21.0491 7.86907C22.3891 3.81907 20.1891 1.60907 16.1391 2.95907ZM16.4591 8.33907L12.6591 12.1591C12.5091 12.3091 12.3191 12.3791 12.1291 12.3791C11.9391 12.3791 11.7491 12.3091 11.5991 12.1591C11.3091 11.8691 11.3091 11.3891 11.5991 11.0991L15.3991 7.27907C15.6891 6.98907 16.1691 6.98907 16.4591 7.27907C16.7491 7.56907 16.7491 8.04907 16.4591 8.33907Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageBar;
