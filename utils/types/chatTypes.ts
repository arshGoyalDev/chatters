import { UserInfo } from "./authTypes";

interface ChatData {
  chatName: string;
  chatPic: string;
  chatStatus: string;
  chatMembers: UserInfo[];
  chatAdmin?: UserInfo;
  chatCreatedAt?: Date;
  chatUpdatedAt?: Date;
  chatId?: string
}

interface Message {
  content: string | null;
  fileUrl: string | null;
  messageType: string;
  recipient: string | UserInfo;
  sender: string | UserInfo;
  timeStamp: string;
  _id: string;
  groupId?: string;
}

interface PersonalContact {
  _id: string;
  lastMessageSender: string;
  lastFile: string | null;
  lastMessage: string | null;
  lastMessageTime: string;
  userInfo: UserInfo;
}

interface Group {
  _id: string;
  groupName: string;
  groupStatus: string;
  groupPic: string;
  updatedAt: Date;
  createdAt: Date;
  messages: [];
  groupAdmin: UserInfo;
  groupMembers: UserInfo[];
}

export type { ChatData, Message, PersonalContact, Group };
