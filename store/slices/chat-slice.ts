import { ChatData} from "@/utils/types";
import { StateCreator } from "zustand";

interface ChatSlice {
  chatType: string | null;
  setChatType: (chatType: string | null) => void;

  chatData: ChatData | null;
  setChatData: (chatData: ChatData | null) => void;

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