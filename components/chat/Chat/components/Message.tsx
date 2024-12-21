import type { Message, UserInfo } from "@/utils/types";

import moment from "moment";

import FileDisplay from "./FileDisplay";

import { apiClient } from "@/lib/api-client";
import { HOST } from "@/utils/constants";

const Message = ({
  message,
  userInfo,
}: {
  message: Message;
  userInfo: UserInfo;
}) => {
  const downloadFile = async () => {
    try {
      const response = await apiClient.get(`${HOST}/${message.fileUrl}`, {
        responseType: "blob",
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = urlBlob;
      link.setAttribute("download", message.fileUrl ? message.fileUrl.split("/")[message.fileUrl.split("/").length - 1] : "");

      document.body.appendChild(link);

      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 ${
        userInfo._id === message.sender ? "items-end" : "items-start"
      }`}
    >
      {message.fileUrl && (
        <div
          className={`flex gap-2 items-end ${
            userInfo._id !== message.sender ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div
            className={`flex w-[100%] h-fit max-w-96 rounded-lg p-2 ${
              userInfo._id === message.sender ? "bg-zinc-900" : "bg-primary"
            }`}
          >
            <FileDisplay filePath={message.fileUrl} />
          </div>
          <button
            onClick={downloadFile}
            className={`p-2 rounded-lg ${
              userInfo._id === message.sender ? "bg-zinc-900" : "bg-primary"
            }`}
          >
            <span
              className={`${
                userInfo._id === message.sender
                  ? "stroke-white"
                  : "stroke-black"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.31995 11.6799L11.8799 14.2399L14.4399 11.6799"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.88 4V14.17"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 12.1799C20 16.5999 17 20.1799 12 20.1799C7 20.1799 4 16.5999 4 12.1799"
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
      {message.content && (
        <div
          className={`relative max-w-[60%] leading-6 ${
            userInfo._id !== message.sender
              ? "bg-primary text-black"
              : "bg-zinc-900 text-white"
          } py-3 px-6 font-semibold text-xl rounded-lg break-words`}
        >
          {message.content}
        </div>
      )}
      <div className="text-base px-1">
        {moment(message.timeStamp).format("lll")}
      </div>
    </div>
  );
};

export default Message;
