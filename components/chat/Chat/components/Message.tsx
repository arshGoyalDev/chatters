import type { Message, UserInfo } from "@/utils/types";
import moment from "moment";

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
        userInfo._id === message.sender._id ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`relative max-w-[60%] leading-6 border-[1px] ${
          userInfo._id !== message.sender._id
            ? "bg-primary text-black"
            : "bg-zinc-900 text-white border-primary border-opacity-20"
        } py-3 px-6 font-bold text-xl rounded-lg`}
      >
        {message.content}
        <div
        //   className={` ${
        //     userInfo._id === message.sender._id ? "right-2" : "left-2"
        //   } bottom-2`}
        >
        </div>
      </div>
          <div className="text-base px-1">{moment(message.timeStamp).format("LT")}</div>
    </div>
  );
};

export default Message;
