import useAppStore from "@/store";

import { apiClient } from "@/lib/api-client";
import { GET_PERSONAL_CONTACTS_ROUTE, HOST } from "@/utils/constants";

import { useEffect } from "react";

import moment from "moment";
import { PersonalContact } from "@/utils/types";



const PersonalContacts = () => {
  const { personalContacts, setPersonalContacts, messages, setChatData, setChatType, chatData } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_PERSONAL_CONTACTS_ROUTE, {
          withCredentials: true,
        });

        if (response.data.contacts.length !== 0) {
          setPersonalContacts(response.data.contacts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getContacts();
  }, [messages, setPersonalContacts]);

  useEffect(() => {
    console.log(personalContacts);
  }, [personalContacts]);

  const viewPersonalChat = (contact: PersonalContact) => {
    setChatType("personal");
    setChatData({
      chatName: `${contact.firstName} ${contact.lastName}`,
      chatPic: contact.profilePic,
      chatStatus: contact.status,
      chatMembers: [contact],
    });
  }

  return (
    <div className="px-2 py-2">
      <h2 className="text-xl font-bold px-2">Personal Chats</h2>

      <div className="flex flex-col gap-0.5 mt-5">
        {personalContacts.length !== 0 ? (
          personalContacts.map((contact) => {
            return (
              <div key={contact._id}
              onClick={() => viewPersonalChat(contact)}
               className={`flex justify-between hover:bg-zinc-800 transition-all duration-300 py-4 pl-3 pr-4 rounded-lg hover:bg-opacity-40 ${chatData?.chatMembers[0]._id === contact._id && "bg-zinc-800 bg-opacity-40"}`}>
                <div className="flex gap-4 items-center">
                  <div className="grid place-content-center w-[54px] h-[54px] rounded-lg bg-zinc-800 overflow-hidden">
                    {contact.profilePic ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`${HOST}/${contact.profilePic}`}
                        alt={contact.firstName}
                      />
                    ) : (
                      <span className="fill-zinc-700">
                        <svg
                          width="54"
                          height="36"
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
                    )}
                  </div>
                  <div className="flex-col gap-2">
                    <h2 className="font-bold text-xl">
                      {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="flex gap-1 items-center">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <span className="font-semibold text-base">
                    {moment(contact.lastMessageTime).format("LT")}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="font-semibold text-center py-3">
            No personal chats to show.
            <br />
            Start a New Personal Chat.
          </div>
        )}
      </div>
    </div>
  );
};
export default PersonalContacts;
