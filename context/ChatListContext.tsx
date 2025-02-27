"use client";

import { apiClient } from "@/lib/api-client";

import useAppStore from "@/store";

import {
  GET_PERSONAL_CONTACTS_ROUTE,
  GET_USER_GROUPS_ROUTE,
} from "@/utils/constants";

import { Group, PersonalContact } from "@/utils/types";
import { userInfo } from "os";

import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

interface ChatListContextType {
  personalContacts: PersonalContact[] | [];
  groupsList: Group[] | [];
  getGroups: () => void;
  getContacts: () => void;
}

const ChatListContext = createContext<ChatListContextType | null>(null);

const useChatList = () => useContext(ChatListContext);

const ChatListProvider = ({ children }: { children: ReactElement }) => {
  const [groupsList, setGroupsList] = useState<Group[] | []>([]);
  const [personalContacts, setPersonalContacts] = useState<
    [PersonalContact] | []
  >([]);
  const { chatData, chatType, messages, userInfo } = useAppStore();

  const getGroups = async () => {
    try {
      const response = await apiClient.get(GET_USER_GROUPS_ROUTE, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setGroupsList(response.data.groupsList);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    if (userInfo.email !== "") {
      getGroups();
      getContacts();
    }
  }, [chatData, chatType, messages, userInfo]);

  return (
    <ChatListContext.Provider
      value={{ groupsList, personalContacts, getGroups, getContacts }}
    >
      {children}
    </ChatListContext.Provider>
  );
};

export { useChatList };
export default ChatListProvider;
