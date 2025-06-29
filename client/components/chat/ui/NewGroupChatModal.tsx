import { useRef, useState } from "react";

import { ModalHeader, SelectMultiContact } from "./";

import { UserInfo } from "@/utils/types";
import {
  ADD_CHAT_PIC_ROUTE,
  CREATE_GROUP_CHAT_ROUTE,
} from "@/utils/constants";
import { apiClient } from "@/lib/api-client";

import { useRouter } from "next/navigation";

import useAppStore from "@/store";

import { useError } from "@/context";

import Image from "next/image";

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
  const [file, setFile] = useState<File | null>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [buttonHovered, setButtonHovered] = useState(false);

  const handleFileInputClick = () => {
    if (!groupPic) {
      fileUploadRef.current!.click();
    }
  };

  const addGroupPic = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("chat-pic", file);

      try {
        const response = await apiClient.post(ADD_CHAT_PIC_ROUTE, formData, {
          withCredentials: true,
        });

        return response.data.chatPic;
      } catch (error) {
        errorContext?.setErrorMessage("Failed to update group picture");
        return false;
      }
    } else return false;
  };

  const deleteGroupPic = async () => {
    setFile(null);
    setGroupPic("");
  };

  const createGroup = async () => {
    const uploadedGroupPic = await addGroupPic();

    try {
      const response = await apiClient.post(
        CREATE_GROUP_CHAT_ROUTE,
        {
          chatName: groupName,
          chatDescription: groupDescription,
          chatPic: uploadedGroupPic ? uploadedGroupPic : "",
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
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] rounded-xl bg-zinc-950 border-2 border-zinc-900 shadow-2xl">
      <ModalHeader title="New Group Chat" />

      <div className="flex flex-col lg:flex-row max-h-[65vh] lg:h-fit overflow-y-auto">
        <div className="flex flex-col gap-3 w-full border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-900 px-4 py-4">
          <div>
            <h2 className="font-bold uppercase text-zinc-600 mb-2">
              Group Pic
            </h2>
            <div className="relative w-full grid place-content-center border-2 border-zinc-900 rounded-lg overflow-hidden">
              <div
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                onClick={handleFileInputClick}
                className="relative w-32 aspect-square grid place-content-center"
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
                      <div className="relative w-32 aspect-square rounded-md overflow-hidden">
                        <Image src={groupPic}
                          fill sizes="100%"
                          alt={groupName} className="w-full h-full" priority />
                      </div>
                    }
                    <button
                      onClick={deleteGroupPic}
                      className="absolute top-2 right-2 p-1 bg-zinc-800 border-2 border-zinc-900 rounded-lg"
                    >
                      <span className="stroke-white">
                        <svg
                          width="18"
                          height="18"
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
                  <span className="stroke-zinc-800 fill-zinc-800">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="#27272a"
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
                onChange={(e) => {
                  const file = e.target.files![0];
                  setFile(file);
                  setGroupPic(URL.createObjectURL(file));
                }}
                name="chat-pic"
                accept=".png, .jpg, .svg, .jpeg, .webp"
                className="absolute hidden top-0 left-0 w-full h-full"
              />
            </div>
          </div>
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
            className="w-full bg-transparent px-3 py-2 border-2 border-zinc-900 rounded-md placeholder:text-zinc-600"
          />
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
            className="w-full px-3 py-2 bg-transparent border-2 border-zinc-900 rounded-md placeholder:text-zinc-600 resize-none"
          />
        </div>

        <SelectMultiContact
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      </div>

      <div className="flex justify-end border-t-2 border-zinc-900 px-4 py-4">
        <button
          onClick={createGroup}
          className="px-4 py-1.5 text-black bg-primary rounded-md font-semibold"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};
export default NewGroupChatModal;
