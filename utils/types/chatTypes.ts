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
  content: string;
  fileUrl: string;
  messageType: string;
  recipient: string | UserInfo;
  sender: string | UserInfo;
  timeStamp: string;
  _id: string;
}

interface GroupMessage extends Message {
  sender: UserInfo;
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
  messages: [GroupMessage] | [];
  groupAdmin: UserInfo;
  groupMembers: UserInfo[];
}

export type { ChatData, Message, PersonalContact, Group, GroupMessage };
