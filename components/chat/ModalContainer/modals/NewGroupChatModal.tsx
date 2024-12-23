/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";

import { ModalHeader, SelectMultiContact } from "../components";

import { UserInfo } from "@/utils/types";
import { ADD_GROUP_PIC_ROUTE, HOST, REMOVE_GROUP_PIC } from "@/utils/constants";

import { apiClient } from "@/lib/api-client";

const NewGroupChatModal = () => {
  const [selectedContacts, setSelectedContacts] = useState<UserInfo[] | null>(
    null
  );

  const [groupName, setGroupName] = useState("");
  const [groupStatus, setGroupStatus] = useState("");

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
      formData.append("group-pic", file);

      try {
        const response = await apiClient.post(ADD_GROUP_PIC_ROUTE, formData, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setGroupPic(response.data.groupPic);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteGroupPic = async () => {
    try {
      const response = await apiClient.delete(REMOVE_GROUP_PIC, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setGroupPic("");
      }
    } catch (error) {
      console.error(error);
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
            <input
              type="text"
              name="group-status"
              id="group-status"
              value={groupStatus}
              autoComplete="off"
              autoFocus={true}
              onChange={(e) => {
                setGroupStatus(e.target.value);
              }}
              placeholder="Group Name..."
              className="w-full bg-zinc-800 px-3 py-3 bg-transparent rounded-lg placeholder:text-zinc-400"
            />
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Group Pic</h2>
            <div className="relative w-fit bg-zinc-900 border-2 border-zinc-700 rounded-2xl overflow-hidden">
              <div
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                onClick={handleFileInputClick}
                className="relative w-[240px] h-[240px] grid place-content-center"
              >
                {buttonHovered && !groupPic && (
                  <div className="grid place-content-center absolute z-20 top-0 left-0 w-full h-full bg-zinc-950 bg-opacity-90 transition-all duration-300 cursor-pointer">
                    <span className="stroke-white">
                      <svg
                        width="100"
                        height="100"
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
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.97 10H3.96997V18C3.96997 21 4.96997 22 7.96997 22H15.97C18.97 22 19.97 21 19.97 18V10Z"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21.5 7V8C21.5 9.1 20.97 10 19.5 10H4.5C2.97 10 2.5 9.1 2.5 8V7C2.5 5.9 2.97 5 4.5 5H19.5C20.97 5 21.5 5.9 21.5 7Z"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                ) : (
                  <span className="fill-zinc-700">
                    <svg
                      width="150"
                      height="150"
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
              <input
                type="file"
                ref={fileUploadRef}
                onChange={handleImageChange}
                name="group-pic"
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
        <button className="px-6 py-2 bg-primary rounded-lg font-bold text-lg hover:text-white hover:bg-zinc-800 hover:bg-opacity-80 transition-all duration-300">
          Create Group
        </button>
      </div>
    </div>
  );
};
export default NewGroupChatModal;
