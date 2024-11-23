"use client";

import useAppStore from "@/store";
import { useEffect } from "react";

const MessagesContainer = ({chatInfoVisible} : {chatInfoVisible: boolean}) => {
  const { messages, userInfo } = useAppStore();

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      {messages.length !== 0 ? (
        <div className={`scrollbar-invisible h-[84vh] flex flex-col max-w-[1000px] mx-auto gap-2 overflow-y-auto p-6 lg:py-10 ${chatInfoVisible ? "lg:px-10" : "px-0"} 2xl:px-0`}>
          {
            messages.map((message) => {
              return (
                <div key={message._id} className={`flex flex-col gap-2 ${userInfo._id === message.sender._id ? "items-end" : "items-start"}`} >
                  <div className={`relative max-w-[60%] leading-6 ${userInfo._id !== message.sender._id ? "bg-primary text-black pl-16" : "bg-zinc-900 text-white pr-16"} pt-3 pb-4 px-4 font-bold text-lg rounded-lg`}>
                    {message.content}
                    <div className={`absolute ${userInfo._id === message.sender._id ? "right-2" : "left-2"} bottom-2`}>

                    <div className="text-sm px-1">{"4 secs"}</div>

                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default MessagesContainer;
