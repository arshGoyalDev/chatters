import { UserInfo } from "./authTypes";

interface ChatData {
  chatName: string;
  chatPic: string;
  chatStatus: string;
  chatMembers: UserInfo[];
}

interface Message {
  content: string;
  fileUrl: string;
  messageType: string;
  recipient: UserInfo;
  sender: UserInfo;
  timeStamp: string;
  _id: string;
}

export type { ChatData, Message };
