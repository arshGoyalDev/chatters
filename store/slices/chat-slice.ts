import { StateCreator } from "zustand";

interface ChatSlice {
  chatType: string | null;
  setChatType: (chatType: string | null) => void;

  chatData: string | null;
  setChatData: (chatData: string | null) => void;

  messages: [] | null;
  setMessages: (messages: [] | null) => void

  closeChat: () => void;
}

const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  chatType: null,
  setChatType: (chatType) => set({chatType}),

  chatData: null,
  setChatData: (chatData) => set({chatData}),

  messages: null,
  setMessages: (messages) => set({messages}),

  closeChat: () => set({chatData: null, chatType: null, messages: null}),
});

export default createChatSlice;