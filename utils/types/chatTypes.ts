import { UserInfo } from "./authTypes";

interface ChatData {
  chatName: string;
  chatPic: string;
  chatStatus: string;
  chatMembers: [
    {
      _id: string;
      email: string;
      password?: string;
      profileSetup?: boolean;
      firstName: string;
      lastName: string;
      status: string;
      userOnline: boolean;
      profilePic: string;
    }
  ];
}

interface Message {
  content: string | null;
  fileUrl: string | null;
  messageType: string;
  recipient: UserInfo | string;
  sender: UserInfo | string;
  timeStamp: string;
  _id: string;
}

interface PersonalContact {
  _id: string;
  lastMessageSender: string;
  lastFile: string | null;
  lastMessage: string | null;
  lastMessageTime: string;
  userInfo: UserInfo;
}

export type { ChatData, Message, PersonalContact };
