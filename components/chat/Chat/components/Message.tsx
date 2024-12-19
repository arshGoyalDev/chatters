import type { Message, UserInfo } from "@/utils/types";
import moment from "moment";
import { useEffect } from "react";

const Message = ({
  message,
  userInfo,
}: {
  message: Message;
  userInfo: UserInfo;
}) => {

  useEffect(() => {
    // console.log(userInfo._id, message.sender._id);
  }
  , [])

  return (
    <div
      className={`flex flex-col gap-2 ${
        userInfo._id === message.sender ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`relative max-w-[60%] leading-6 ${
          userInfo._id !== message.sender
            ? "bg-primary text-black"
            : "bg-zinc-900 text-white border-[1px] border-zinc-800"
        } py-3 px-6 font-semibold text-xl rounded-lg break-words`}
      >
        {message.content}
        <div
        //   className={` ${
        //     userInfo._id == = message.sender._id ? "right-2" : "left-2"
        //   } bottom-2`}
        >
        </div>
      </div>
          <div className="text-base px-1">{moment(message.timeStamp).format("lll")}</div>
    </div>
  );
};

export default Message;
