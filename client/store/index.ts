import { create } from "zustand";
import { createAuthSlice, createChatSlice } from "./slices";

import { Chat, Message, UserInfo } from "@/utils/types";

interface AppStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  chatData: Chat | null;
  setChatData: (chatData: Chat | null) => void;

  messages: [Message] | [];
  setMessages: (messages: [Message] | []) => void

  addMessage: (message: Message) => void;

  closeChat: () => void;
  
  usersTyping: {
    userData: UserInfo;
    chatId: string;
  }[];

  setUsersTyping: (usersTyping: {
    userData: UserInfo;
    chatId: string;
    }[]) => void;
}

const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));

export default useAppStore;
