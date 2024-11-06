/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import { ModalHeader } from "../components";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACT_ROUTE } from "@/utils/constants";
import { UserInfo } from "@/utils/types";

const NewChatModal = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedContacts, setSearchedContacts] = useState<[] | null>(null);

  const searchContacts = async () => {
    try {
      if (searchValue !== "") {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm: searchValue },
          { withCredentials: true }
        );

        console.log(response.data.contacts);

        if (response.status === 200) {
          if (response.data.contacts[0])
            setSearchedContacts(response.data.contacts);
          else setSearchedContacts(null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-[500px] h-[400px] rounded-xl bg-zinc-900 shadow-2xl">
      <ModalHeader title="New Chat" />
      <div className="pb-4 px-5">
        <div className="flex gap-2 items-center bg-zinc-800 rounded-lg px-3">
          <input
            type="text"
            name="search-people"
            id="search-people"
            value={searchValue}
            autoComplete="off"
            autoFocus={true}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (e.target.value === "") setSearchedContacts(null);
              else searchContacts();
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                searchContacts();
              }
            }}
            placeholder="Search for people..."
            className="w-full py-3 px-1 bg-transparent rounded-lg placeholder:text-zinc-400"
          />

          <button className="p-1" onClick={searchContacts}>
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

        {searchedContacts ? (
          <div className="mt-4 h-[240px] overflow-auto">
            {searchedContacts.map((contact: UserInfo) => 
              (
                <div key={contact.email} className="flex items-center gap-4 py-2 px-2 hover:bg-zinc-800 hover:bg-opacity-50 transition-all duration-100 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img src={`${HOST}/${contact.profilePic}`} alt={contact.firstName + contact.lastName} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold text-lg">{`${contact.firstName} ${contact.lastName}`}</p>
                    <p>{contact.status}</p>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="grid place-content-center text-lg pt-28 text-center">
            Nothing to see here, <br />
            Search people to start a new chat.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewChatModal;
