import { ChatData, Message } from "@/utils/types";
import { StateCreator } from "zustand";

interface ChatSlice {
  chatType: string | null;
  setChatType: (chatType: string | null) => void;

  chatData: ChatData | null;
  setChatData: (chatData: ChatData | null) => void;

  messages: [Message] | [];
  setMessages: (messages: [Message] | []) => void;

  addMessage: (message: Message) => void;

  closeChat: () => void;
}

const createChatSlice: StateCreator<ChatSlice> = (set, get) => ({
  chatType: null,
  setChatType: (chatType) => set({ chatType, messages: [] }),

  chatData: null,
  setChatData: (chatData) => set({ chatData, messages: [] }),

  messages: [],
  setMessages: (messages) => set({ messages }),

  addMessage: (message) => {
    const chatMessages = get().messages;

    set({
      messages: [
        ...chatMessages,
        {
          ...message
        },
      ],
    });
  },

  closeChat: () => set({ chatData: null, chatType: null, messages: [] }),
});

export default createChatSlice;
