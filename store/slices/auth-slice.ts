import { StateCreator } from "zustand";

import { UserInfo } from "@/utils/types";

interface AuthSlice {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    profilePic: "",
    profileSetup: false,
  },

  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
});

export default createAuthSlice;
