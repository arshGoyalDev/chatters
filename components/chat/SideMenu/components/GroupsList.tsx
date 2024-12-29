import { useEffect, useState } from "react";

import { apiClient } from "@/lib/api-client";
import { GET_USER_GROUPS_ROUTE, HOST } from "@/utils/constants";

import useAppStore from "@/store";

import moment from "moment";

import { ChatData, Group } from "@/utils/types";

import Link from "next/link";

const GroupsList = () => {
  const { chatType, chatData, setChatType, setChatData, userInfo, messages } =
    useAppStore();
  const [groupsList, setGroupsList] = useState<Group[] | null>(null);

  useEffect(() => {
    const getgroups = async () => {
      try {
        const response = await apiClient.get(GET_USER_GROUPS_ROUTE, {
          withCredentials: true,
        });

        console.log(response.data.groupsList);

        if (response.status === 200) {
          setGroupsList(response.data.groupsList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getgroups();
  }, [chatType, chatData, messages]);

  const viewGroupChat = (group: Group) => {
    const newChatData: ChatData = {
      chatName: group.groupName,
      chatStatus: group.groupDescription,
      chatMembers: group.groupMembers,
      chatPic: group.groupPic,
      chatCreatedAt: group.createdAt,
      chatAdmin: group.groupAdmin,
      chatUpdatedAt: group.updatedAt,
      chatId: group._id,
    };

    setChatType("group");
    setChatData(newChatData);
  };

  return (
    <div className="px-2 pt-2 pb-5">
      <h2 className="text-zinc-700 uppercase font-bold px-2 pb-1">Groups</h2>

      <div className="flex flex-col">
        {groupsList ? (
          groupsList.map((group) => (
            <div
              key={group._id}
              onClick={() => viewGroupChat(group)}
              className={`flex justify-between items-center hover:bg-zinc-800 transition-all duration-300 py-3 pl-3 pr-4 rounded-lg hover:bg-opacity-40`}
            >
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-zinc-800">
                  {group.groupPic ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={`${HOST}/${group.groupPic}`}
                        alt={group.groupName}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full grid place-content-center">
                      <span className="fill-zinc-700">
                        <svg
                          width="24"
                          height="24"
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
                <h2 className="font-bold text-xl">{group.groupName}</h2>
              </div>
              <div className="font-semibold text-base">
                {moment(group.updatedAt).format("LT")}
              </div>
            </div>
          ))
        ) : (
          <div className="font-semibold text-center py-5">
            No groups to show.
            <br />
            Create a{" "}
            <Link className="text-primary" href={"/chat/new-group-chat=true"}>
              new group
            </Link>
            .
          </div>
        )}
      </div>
    </div>
  );
};
export default GroupsList;
