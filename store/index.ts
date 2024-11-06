import { create } from "zustand";
import { createAuthSlice, createChatSlice } from "./slices";

import { UserInfo } from "@/utils/types";

interface AppStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  chatType: string | null;
  setChatType: (chatType: string | null) => void;

  chatData: string | null;
  setChatData: (chatData: string | null) => void;

  messages: [] | null;
  setMessages: (messages: [] | null) => void

  closeChat: () => void;
}

const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));

export default useAppStore;
