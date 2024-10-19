import { create } from "zustand";
import { createAuthSlice } from "./slices";

import { UserInfo } from "@/utils/types";

interface AppStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
}));

export default useAppStore;
