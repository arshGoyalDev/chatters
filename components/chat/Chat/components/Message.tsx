import type { Message, UserInfo } from "@/utils/types";

import moment from "moment";

import FileDisplay from "./FileDisplay";

import { apiClient } from "@/lib/api-client";
import { HOST } from "@/utils/constants";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import useAppStore from "@/store";
import { useEffect } from "react";

const Message = ({ message }: { message: Message }) => {
  const { userInfo } = useAppStore();

  const downloadFile = async () => {
    try {
      const response = await apiClient.get(`${HOST}/${message.fileUrl}`, {
        responseType: "blob",
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = urlBlob;
      link.setAttribute(
        "download",
        message.fileUrl
          ? message.fileUrl.split("/")[message.fileUrl.split("/").length - 1]
          : ""
      );

      document.body.appendChild(link);

      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(message);
  }, [])

  return (
    <div
      className={`flex flex-col gap-2 ${
        userInfo._id === message.sender._id ? "items-end" : "items-start"
      }`}
    >
      {message.fileUrl && (
        <div
          className={`flex gap-2 items-end ${
            userInfo._id !== message.sender._id ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div
            className={`flex w-[100%] h-fit max-w-96 rounded-lg p-2 border-2 ${
              userInfo._id === message.sender._id
                ? "bg-zinc-900 bg-opacity-40 border-zinc-800"
                : "bg-primary bg-opacity-5 border-primary border-opacity-20"
            }`}
          >
            <FileDisplay filePath={message.fileUrl} />
          </div>
          <button
            onClick={downloadFile}
            className={`p-0.5 rounded-lg border-2 ${
              userInfo._id === message.sender._id
                ? "bg-zinc-900 bg-opacity-40 border-zinc-800"
                : "bg-primary bg-opacity-5 border-primary border-opacity-20"
            }`}
          >
            <span
              className={`${
                userInfo._id === message.sender._id
                  ? "stroke-white"
                  : "stroke-primary"
              }`}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 11.51L12 14.51L15 11.51"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14.51V6.51001"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 16.51C9.89 17.81 14.11 17.81 18 16.51"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      )}
      {message.content && (
        <div
          className={`relative max-w-[80%] lg:max-w-[60%] leading-6 ${
            userInfo._id !== message.sender._id
              ? "bg-primary bg-opacity-5 border-primary border-opacity-20 text-primary message-sender font-semibold"
              : "bg-zinc-900 bg-opacity-40 border-zinc-800 text-white message-receiver font-medium"
          } py-3 px-6 text-lg rounded-lg break-words border-2`}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
        </div>
      )}
      <div className="text-sm pt-0.5 font-semibold text-zinc-500">
        {moment(message.timeStamp).format("lll")}
      </div>
    </div>
  );
};

export default Message;
