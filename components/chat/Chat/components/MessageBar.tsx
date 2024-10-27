"use client";

import { useState } from "react";

const MessageBar = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex items-center absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] bg-zinc-900 px-2 rounded-xl">
      <input
        type="text"
        name="message-input"
        id="message-input"
        value={message}
        autoComplete="off"
        autoFocus={true}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type Something..."
        className="w-full py-4 pl-4 pr-2 placeholder:text-zinc-500 bg-transparent"
      />

      <div className="flex items-center gap-2">
        <button className="p-1 border-2 border-transparent focus:border-zinc-800 rounded-lg">
          <span className="stroke-white">
            <svg
              width="24"
              height="24"
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
        <button className="p-1 border-2 border-transparent focus:border-zinc-800 rounded-lg">
          <span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1391 2.95907L7.10914 5.95907C1.03914 7.98907 1.03914 11.2991 7.10914 13.3191L9.78914 14.2091L10.6791 16.8891C12.6991 22.9591 16.0191 22.9591 18.0391 16.8891L21.0491 7.86907C22.3891 3.81907 20.1891 1.60907 16.1391 2.95907ZM16.4591 8.33907L12.6591 12.1591C12.5091 12.3091 12.3191 12.3791 12.1291 12.3791C11.9391 12.3791 11.7491 12.3091 11.5991 12.1591C11.3091 11.8691 11.3091 11.3891 11.5991 11.0991L15.3991 7.27907C15.6891 6.98907 16.1691 6.98907 16.4591 7.27907C16.7491 7.56907 16.7491 8.04907 16.4591 8.33907Z"
                fill="#9DDBAD"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};
export default MessageBar;
