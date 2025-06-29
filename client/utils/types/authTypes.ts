interface UserInfo {
  _id: string;
  email: string;
  password?: string;
  profileSetup: boolean;
  firstName: string;
  lastName: string;
  status: string,
  userOnline: boolean,
  profilePic: string;
}

export type {UserInfo};