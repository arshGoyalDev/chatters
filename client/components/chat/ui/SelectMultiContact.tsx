import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { apiClient } from "@/lib/api-client";

import { SEARCH_CONTACT_ROUTE } from "@/utils/constants";
import { UserInfo } from "@/utils/types";

import { useError } from "@/context";
import SearchedContact from "./SearchedContact";

import useAppStore from "@/store";

const SelectMultiContact = ({
  selectedContacts,
  setSelectedContacts,
  addMember = false,
}: {
  selectedContacts: UserInfo[] | null;
  setSelectedContacts: Dispatch<SetStateAction<UserInfo[] | null>>;
  addMember?: boolean;
}) => {
  const errorContext = useError();

  const { chatData } = useAppStore();

  const [searchValue, setSearchValue] = useState("");
  const [searchedContacts, setSearchedContacts] = useState<UserInfo[] | null>(
    null
  );

  useEffect(() => {
    const searchContacts = setTimeout(async () => {
      try {
        if (searchValue !== "") {
          const response = await apiClient.post(
            SEARCH_CONTACT_ROUTE,
            { searchTerm: searchValue },
            { withCredentials: true }
          );

          if (response.status === 200) {
            if (response.data.contacts.length !== 0)
              if (addMember && chatData) {
                const filteredContacts = response.data.contacts.filter(
                  (contact: UserInfo) => {
                    let alreadyMember = false;

                    for (let chatMember of chatData.chatMembers) {
                      if (chatMember._id === contact._id) alreadyMember = true;
                    }

                    if (!alreadyMember) return contact;
                  }
                );

                setSearchedContacts(filteredContacts);
              } else setSearchedContacts(response.data.contacts);
            else setSearchedContacts(null);
          }
        }
      } catch (error) {
        errorContext?.setErrorMessage("Failed to search contacts");
      }
    }, 500);

    return () => clearTimeout(searchContacts);
  }, [searchValue]);

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
    <div className="w-full h-full py-4 px-4">
      <div className="flex gap-2 items-center border-2 border-zinc-900 rounded-lg px-3">
        <input
          type="text"
          name="search-people"
          id="search-people"
          value={searchValue}
          autoComplete="off"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for people..."
          className="w-full py-2 px-1 bg-transparent rounded-lg placeholder:text-zinc-600"
        />

        <button className="p-1">
          <span className="stroke-white">
            <svg
              width="18"
              height="18"
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

      <div className="max-h-[320px] overflow-y-auto flex flex-col gap-2">
        {selectedContacts?.length !== 0 && selectedContacts && (
          <div className="flex flex-wrap gap-2 pt-4">
            {selectedContacts.map((contact) => (
              <div
                key={contact._id}
                className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-md border-2 border-zinc-900"
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
          <div>
            {searchedContacts.map((contact: UserInfo) => (
              <div key={contact._id} onClick={() => selectContact(contact)}>
                <SearchedContact contact={contact} groupChat={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid place-content-center text-lg pt-8 pb-6 text-center">
            Nothing to see here, <br />
            Search people to start a new chat.
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectMultiContact;
