import { UserInfo } from "@/utils/types";

import { apiClient } from "./api-client";
import { GET_USER_INFO_ROUTE } from "@/utils/constants";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const getUserInfo = async (
  router: AppRouterInstance,
  setUserInfo: (userInfo: UserInfo) => void,
  pathname: string
) => {
  try {
    const response = await apiClient.get(GET_USER_INFO_ROUTE, {
      withCredentials: true,
    });

    if (response.status === 200) {
      setUserInfo(response.data.user);
    } else {
      throw new Error("No User Found");
    }
  } catch (error) {
    if (error) {
      if (pathname !== "/") {
        router.push("/auth");
      }
    }
  }
};

export { getUserInfo };
