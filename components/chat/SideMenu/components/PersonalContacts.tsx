import useAppStore from "@/store";

import { HOST } from "@/utils/constants";

import moment from "moment";

import { PersonalContact } from "@/utils/types";
import { useChatList } from "@/context";
import Link from "next/link";

const PersonalContacts = () => {
  const { setChatData, chatType, setChatType, chatData, userInfo } =
    useAppStore();
  const chatList = useChatList();

  const viewPersonalChat = (contact: PersonalContact) => {
    setChatType("personal");
    setChatData({
      chatName: `${contact.userInfo.firstName} ${contact.userInfo.lastName}`,
      chatPic: contact.userInfo.profilePic,
      chatStatus: contact.userInfo.status,
      chatMembers: [contact.userInfo],
    });
  };

  return (
    <div className="px-2 py-2">
      <h2 className="font-bold text-zinc-700 uppercase px-2 pb-1">
        Personal Chats
      </h2>

      <div className="flex flex-col gap-1">
        {chatList?.personalContacts.length !== 0 ? (
          chatList?.personalContacts.map((contact) => {
            return (
              <div
                key={contact._id}
                onClick={() => viewPersonalChat(contact)}
                className={`flex justify-between items-center hover:bg-zinc-800 transition-all duration-300 py-4 pl-3 pr-4 rounded-lg hover:bg-opacity-40 ${
                  chatType === "personal" &&
                  chatData?.chatMembers[0]._id === contact._id &&
                  "bg-zinc-800 bg-opacity-40 cursor-default select-none"
                }`}
              >
                <div className="flex gap-4 items-center w-full">
                  <div className="relative w-[54px] h-[54px] rounded-lg bg-zinc-800">
                    {contact.userInfo.profilePic ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <div className="w-full h-full overflow-hidden rounded-lg">
                        <img
                          src={`${HOST}/${contact.userInfo.profilePic}`}
                          alt={contact.userInfo.firstName}
                          className="rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="grid place-content-center h-full w-full">
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
                      </div>
                    )}
                    {contact.userInfo.userOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-600 border-2 border-zinc-900 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-col gap-2">
                    <h2 className="font-bold text-xl">
                      {contact.userInfo.firstName} {contact.userInfo.lastName}
                    </h2>
                    <div className="flex items-center gap-1">
                      <span>
                        {contact.lastMessageSender !== userInfo._id
                          ? `${contact.userInfo.firstName} :`
                          : "You :"}
                      </span>
                      {contact.lastFile ? (
                        <>
                          <span className="stroke-white">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <p>
                            {contact.lastFile.split("/")[
                              contact.lastFile.split("/").length - 1
                            ].length > 7
                              ? `${contact.lastFile
                                  .split("/")
                                  [
                                    contact.lastFile.split("/").length - 1
                                  ].substring(0, 7)}...`
                              : contact.lastFile.split("/")[
                                  contact.lastFile.split("/").length - 1
                                ]}
                          </p>
                        </>
                      ) : (
                        contact.lastMessage &&
                        (contact.lastMessage?.length > 10
                          ? `${contact.lastMessage?.substring(0, 10)}...`
                          : contact.lastMessage)
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-1 min-w-fit">
                  <span className="font-semibold text-base">
                    {moment(contact.lastMessageTime).format("LT")}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="font-semibold text-center py-5">
            No personal chats to show.
            <br />
            Start a <Link href={"/chat?new-chat=true"}>new personal chat</Link>.
          </div>
        )}
      </div>
    </div>
  );
};
export default PersonalContacts;
