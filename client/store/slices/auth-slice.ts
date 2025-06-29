import { StateCreator } from "zustand";

import { UserInfo } from "@/utils/types";

interface AuthSlice {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: {
    _id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    profilePic: "",
    status: "",
    profileSetup: false,
    userOnline: false
  },

  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
});

export default createAuthSlice;
