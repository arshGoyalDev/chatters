import type { Message, UserInfo } from "@/utils/types";

import moment from "moment";

import FileDisplay from "./FileDisplay";

const Message = ({
  message,
  userInfo,
}: {
  message: Message;
  userInfo: UserInfo;
}) => {
  return (
    <div
      className={`flex flex-col gap-2 ${
        userInfo._id === message.sender ? "items-end" : "items-start"
      }`}
    >
      {message.fileUrl && (
        <div
          className={`flex w-[100%] h-fit max-w-96 rounded-lg p-2 ${
            userInfo._id === message.sender ? "bg-zinc-900" : "bg-primary"
          }`}
        >
          <FileDisplay filePath={message.fileUrl} />
        </div>
      )}
      {message.content && (
        <div
          className={`relative max-w-[60%] leading-6 ${
            userInfo._id !== message.sender
              ? "bg-primary text-black"
              : "bg-zinc-900 text-white border-[1px] border-zinc-800"
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
