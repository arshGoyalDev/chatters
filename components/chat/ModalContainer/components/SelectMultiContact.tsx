/* eslint-disable @next/next/no-img-element */

import { Dispatch, SetStateAction, useState } from "react";

import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACT_ROUTE } from "@/utils/constants";

import { UserInfo } from "@/utils/types";

const SelectMultiContact = ({
  selectedContacts,
  setSelectedContacts,
}: {
  selectedContacts: UserInfo[] | null;
  setSelectedContacts: Dispatch<SetStateAction<UserInfo[] | null>>;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedContacts, setSearchedContacts] = useState<UserInfo[] | null>(
    null
  );

  const searchContacts = async () => {
    try {
      if (searchValue !== "") {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm: searchValue },
          { withCredentials: true }
        );

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

  const selectContact = (contact: UserInfo) => {
    let newContacts: UserInfo[];

    if (selectedContacts) {
      let contactFound = false;

      for (const selectedContact of selectedContacts) {
        if (selectedContact._id === contact._id) {
          contactFound = true;
          break;
        }
      }

      if (!contactFound) newContacts = [...selectedContacts, contact];
      else newContacts = selectedContacts;
    } else {
      newContacts = [contact];
    }

    setSelectedContacts(newContacts);
  };

  const removeContact = (contact: UserInfo) => {
    const newContacts = selectedContacts?.filter((selectContact) => {
      if (selectContact._id !== contact._id) return selectContact;
    });

    if (newContacts) setSelectedContacts(newContacts);
    else setSelectedContacts(null);
  };

  return (
    <div className="w-full py-6 px-6">
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

      {selectedContacts && (
        <div className="flex flex-wrap gap-2 pt-4">
          {selectedContacts.map((contact) => (
            <div
              key={contact._id}
              className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-md bg-zinc-800"
            >
              <div className="font-semibold">
                {`${contact.firstName} ${contact.lastName}`}
              </div>
              <button
                onClick={() => removeContact(contact)}
                className="stroke-white rotate-45"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18V6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {searchedContacts ? (
        <div className="mt-3 h-[240px] overflow-auto">
          {searchedContacts.map((contact: UserInfo) => (
            <div
              onClick={() => selectContact(contact)}
              key={contact.email}
              className="flex items-center gap-4 py-2 px-2 hover:bg-zinc-800 hover:bg-opacity-50 transition-all duration-100 rounded-lg cursor-pointer"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                {contact.profilePic ? (
                  <img
                    src={`${HOST}/${contact.profilePic}`}
                    alt={contact.firstName + contact.lastName}
                  />
                ) : (
                  <div className="grid place-content-center bg-zinc-800 h-full">
                    <span className="fill-zinc-600">
                      <svg
                        width="60"
                        height="40"
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
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-bold text-lg">{`${contact.firstName} ${contact.lastName}`}</p>
                <p>{contact.userOnline ? "Online" : contact.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid place-content-center text-lg pt-12 pb-6 text-center font-semibold">
          Nothing to see here, <br />
          Search people to start a new chat.
        </div>
      )}
    </div>
  );
};
export default SelectMultiContact;
