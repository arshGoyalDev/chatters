/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";

import { ModalHeader, SelectMultiContact } from "../components";

import { UserInfo } from "@/utils/types";
import {
  ADD_CHAT_PIC_ROUTE,
  CREATE_GROUP_CHAT_ROUTE,
  HOST,
  REMOVE_CHAT_PIC_ROUTE,
} from "@/utils/constants";
import { apiClient } from "@/lib/api-client";

import { useRouter } from "next/navigation";

import useAppStore from "@/store";

import { useError } from "@/context";

const NewGroupChatModal = () => {
  const router = useRouter();
  const { setChatData } = useAppStore();
  const errorContext = useError();

  const [selectedContacts, setSelectedContacts] = useState<UserInfo[] | null>(
    null
  );

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const [groupPic, setGroupPic] = useState("");
  const [buttonHovered, setButtonHovered] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (!groupPic) {
      fileUploadRef.current!.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];

    if (file) {
      const formData = new FormData();
      formData.append("chat-pic", file);

      try {
        const response = await apiClient.post(ADD_CHAT_PIC_ROUTE, formData, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setGroupPic(response.data.chatPic);
        }
      } catch (error) {
        errorContext?.setErrorMessage("Failed to update group picture");
      }
    }
  };

  const deleteGroupPic = async () => {
    try {
      const response = await apiClient.post(
        REMOVE_CHAT_PIC_ROUTE,
        {
          fileName: groupPic,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setGroupPic("");
      }
    } catch (error) {
      errorContext?.setErrorMessage("Failed to delete group picture");
    }
  };

  const createGroup = async () => {
    try {
      const response = await apiClient.post(
        CREATE_GROUP_CHAT_ROUTE,
        {
          chatName: groupName,
          chatDescription: groupDescription,
          chatPic: groupPic,
          chatMembers: selectedContacts,
        },
        { withCredentials: true }
      );

      const { chat } = response.data;

      if (response.status === 201) {
        setChatData(chat);
        router.push("/chat");
      }
    } catch (error) {
      errorContext?.setErrorMessage("Failed to create group");
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-[1000px] max-h-[80vh] lg:h-fit overflow-y-auto rounded-xl bg-zinc-900 shadow-2xl">
      <ModalHeader title="New Group Chat" />

      <div className="flex flex-col lg:flex-row border-t-2 border-zinc-800">
        <div className="flex flex-col gap-5 w-full border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-800 px-6 py-6">
          <div>
            <h2 className="font-bold text-lg mb-2">Group Name</h2>
            <input
              type="text"
              name="group-name"
              id="group-name"
              value={groupName}
              autoComplete="off"
              autoFocus={true}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              placeholder="Group Name..."
              className="w-full bg-zinc-800 px-3 py-3 bg-transparent rounded-lg placeholder:text-zinc-400"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg mb-2">Group Status</h2>
            <textarea
              name="group-status"
              id="group-status"
              value={groupDescription}
              autoComplete="off"
              rows={3}
              onChange={(e) => {
                setGroupDescription(e.target.value);
              }}
              placeholder="Group Description..."
              className="w-full bg-zinc-800 px-3 py-3 bg-transparent rounded-lg placeholder:text-zinc-400 resize-none"
            />
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3">Group Pic</h2>
            <div className="relative w-fit bg-zinc-900 border-2 border-zinc-700 rounded-xl overflow-hidden">
              <div
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                onClick={handleFileInputClick}
                className="relative w-[160px] h-[160px] grid place-content-center"
              >
                {buttonHovered && !groupPic && (
                  <div className="grid place-content-center absolute z-20 top-0 left-0 w-full h-full bg-zinc-950 bg-opacity-90 transition-all duration-300 cursor-pointer">
                    <span className="stroke-white">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12H18"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 18V6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                )}
                {groupPic ? (
                  <div>
                    {
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`${HOST}/${groupPic}`}
                        alt={groupName}
                        className="w-full h-full"
                      />
                    }
                    <button
                      onClick={deleteGroupPic}
                      className="absolute top-2 right-2 pt-1.5 p-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg"
                    >
                      <span className="stroke-white">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            stroke="rgb(39 39 42)"
                            width="23"
                            height="23"
                          />
                          <path
                            d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.33 16.5H13.66"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.5 12.5H14.5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                ) : (
                  <span className="stroke-zinc-700 fill-zinc-800">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.3401 20C19.0601 19.85 19.7401 19.56 20.3001 19.13C21.8601 17.96 21.8601 16.03 20.3001 14.86C19.7501 14.44 19.0801 14.16 18.3701 14"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <input
                type="file"
                ref={fileUploadRef}
                onChange={handleImageChange}
                name="chat-pic"
                accept=".png, .jpg, .svg, .jpeg, .webp"
                className="absolute hidden top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        </div>

        <SelectMultiContact
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      </div>
      <div className="flex justify-end border-t-2 border-zinc-800 px-6 py-5">
        <button
          onClick={createGroup}
          className="px-6 py-2 bg-primary rounded-lg font-bold text-lg hover:text-white hover:bg-zinc-800 hover:bg-opacity-80 transition-all duration-300"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};
export default NewGroupChatModal;
