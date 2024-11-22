import { create } from "zustand";
import { createAuthSlice, createChatSlice } from "./slices";

import { ChatData, Message, UserInfo } from "@/utils/types";

interface AppStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  chatType: string | null;
  setChatType: (chatType: string | null) => void;

  chatData: ChatData | null;
  setChatData: (chatData: ChatData | null) => void;

  messages: [Message] | [];
  setMessages: (messages: [Message] | []) => void

  addMessage: (message: Message) => void;

  closeChat: () => void;
}

const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));

export default useAppStore;
