// @ts-nocheck

import { Chat, Message, UserInfo } from "@/utils/types";
import { StateCreator } from "zustand";

interface ChatSlice {
  chatData: Chat | null;
  setChatData: (chatData: Chat | null) => void;

  messages: [Message] | [];
  setMessages: (messages: [Message] | []) => void;

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

  replyMessage: Message | null;
  setReplyMessage: (replyMessage: Message | null) => void;
}

const createChatSlice: StateCreator<ChatSlice> = (set, get) => ({
  chatData: null,
  setChatData: (chatData) => set({ chatData, messages: [] }),

  messages: [],
  setMessages: (messages) => set({ messages }),

  addMessage: (message: Message) => {
    const chatMessages = get().messages;

    set({
      messages: [...chatMessages, message],
    });
  },

  closeChat: () => set({ chatData: null, chatType: null, messages: [], replyMessage: null }),

  usersTyping: [],
  setUsersTyping: (usersTyping) => set({ usersTyping }),

  replyMessage: null,
  setReplyMessage: (replyMessage) => set({ replyMessage }),
});

export default createChatSlice;
