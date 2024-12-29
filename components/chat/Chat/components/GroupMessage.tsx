import type { Message, UserInfo } from "@/utils/types";

import moment from "moment";

import FileDisplay from "./FileDisplay";

import { apiClient } from "@/lib/api-client";
import { HOST } from "@/utils/constants";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import useAppStore from "@/store";

const GroupMessage = ({ message }: { message: Message }) => {
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

  return (
    <>
      {typeof message.sender !== "string" && (
        <div
          className={`flex flex-col gap-2 ${
            userInfo._id === message.sender._id ? "items-end" : "items-start"
          }`}
        >
          <div className="flex items-end gap-3 max-w-[80%] lg:max-w-[60%]">
            {userInfo._id !== message.sender._id &&
              (message.sender.profilePic ? (
                <div className="w-8 h-8 rounded-md overflow-hidden border-2 border-zinc-800">
                  <img
                    src={`${HOST}/${message.sender.profilePic}`}
                    alt={`${message.sender.firstName} ${message.sender.lastName}`}
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
            <div className="flex flex-col gap-2">
              {message.fileUrl && (
                <div
                  className={`flex gap-2 items-end ${
                    userInfo._id !== message.sender._id
                      ? "flex-row"
                      : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex w-[100%] h-fit max-w-96 rounded-lg p-2 border-2 ${
                      userInfo._id === message.sender._id
                        ? "bg-zinc-900 bg-opacity-40 border-zinc-800"
                        : "bg-primary bg-opacity-5 border-primary border-opacity-20 text-primary"
                    }`}
                  >
                    <FileDisplay filePath={message.fileUrl} />
                  </div>
                  <button
                    onClick={downloadFile}
                    className={`p-0.5 rounded-lg border-2 ${
                      userInfo._id === message.sender._id
                        ? "bg-zinc-900 bg-opacity-40 border-zinc-800"
                        : "bg-primary bg-opacity-5 border-primary border-opacity-20 text-primary"
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
                  className={`relative w-full leading-6 ${
                    userInfo._id !== message.sender._id
                      ? "bg-primary bg-opacity-5 border-primary border-opacity-20 text-primary message-sender font-semibold"
                      : "bg-zinc-900 bg-opacity-40 border-zinc-800 text-white message-receiver font-medium"
                  } py-3 px-6 text-lg rounded-lg break-words border-2`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </Markdown>
                </div>
              )}
              <div className={`flex items-end gap-2 ${userInfo._id === message.sender._id && "justify-end"}`}>
                {userInfo._id !== message.sender._id && (
                  <div className="font-bold">
                    {`${message.sender.firstName} ${message.sender.lastName}`}
                  </div>
                )}
                <div className="text-sm">
                  {moment(message.timeStamp).format("lll")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupMessage;
