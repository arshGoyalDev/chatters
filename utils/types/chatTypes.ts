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
      profilePic: string;
    }
  ];
}

interface Message {
  content: string;
  fileUrl: string;
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
  email: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  status: string;
}

export type { ChatData, Message, PersonalContact };
