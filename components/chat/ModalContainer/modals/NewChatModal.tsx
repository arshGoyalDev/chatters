"use client";

import { useState } from "react";

const NewChatModal = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-[500px] h-[400px] pt-6 px-5 rounded-xl bg-zinc-900 shadow-2xl">
      <h1 className="text-xl mb-4 font-bold px-1">New Chat</h1>
      <div className="flex gap-2 items-center bg-zinc-800 rounded-lg px-3">
        <input
          type="text"
          name="search-people"
          id="search-people"
          value={searchValue}
          autoComplete="off"
          autoFocus={true}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for people..."
          className="w-full py-3 px-1 bg-transparent rounded-lg placeholder:text-zinc-400"
        />

        <button className="p-1">
          <span className="stroke-white">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>

      {searchedUsers.length !== 0 ? (
        <div>
         </div>
      ) : (
        <div className="grid place-content-center text-lg pt-28 text-center">
          Nothing to see here, <br/>
          Search people to start a new chat.
          </div>
      )}
    </div>
  );
};

export default NewChatModal;
