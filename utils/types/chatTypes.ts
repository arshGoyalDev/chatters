import { UserInfo } from "./authTypes";
interface Message {
  content: string;
  fileUrls: string[] | null;
  messageType: string;
  recipient: string;
  sender: UserInfo;
  timeStamp: string;
  _id: string;
}

interface Chat {
  _id: string;
  chatType: string;
  chatName: string;
  chatDescription: string;
  chatPic: string;
  updatedAt: Date;
  createdAt: Date;
  messages: [Message] | [];
  chatAdmin: UserInfo;
  chatMembers: UserInfo[];
}

export type { Message, Chat };
