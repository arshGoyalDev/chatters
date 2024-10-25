"use client";

import { useEffect, useRef, useState } from "react";

import useAppStore from "@/store";

import { Input } from "@/components/inputs";

import { apiClient } from "@/lib/api-client";
import {
  ADD_PROFILE_PIC_ROUTE,
  DELETE_PROFILE_PIC_ROUTE,
  HOST,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";

import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useAppStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("Hey, there I am using Chaters!");

  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");

  const [buttonHovered, setButtonHovered] = useState(false);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const checkForErrors = () => {
    if (!firstName || !lastName) {
      setError("Either of firstName or lastName is required");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const updateProfile = async () => {
    if (checkForErrors()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, status },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUserInfo(response.data.user);
          router.push("/chat");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (userInfo.email) {
      setFirstName(userInfo.firstName);
    }
    if (userInfo.lastName) {
      setLastName(userInfo.lastName);
    }

    if (userInfo.status) {
      setStatus(userInfo.status);
    }

    if (userInfo.profilePic) {
      setProfilePic(`${HOST}/${userInfo.profilePic}`);
    }
  }, [userInfo]);

  const handleFileInputClick = () => {
    if (!profilePic) {
      fileUploadRef.current!.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];

    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);

      try {
        const response = await apiClient.post(ADD_PROFILE_PIC_ROUTE, formData, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserInfo(response.data.user);
          setProfilePic(response.data.user.profilePic);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteProfilePic = async () => {
    try {
      const response = await apiClient.delete(DELETE_PROFILE_PIC_ROUTE, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const newUserInfo = userInfo;
        newUserInfo.profilePic = "";

        setProfilePic("");
        setUserInfo(newUserInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen xl:p-8 grid place-content-center">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <div>
          <div className="relative bg-zinc-900 border-2 border-zinc-700 rounded-2xl overflow-hidden">
            <div
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              onClick={handleFileInputClick}
              className="relative w-[80vw] h-[80vw] max-w-[360px] max-h-[360px] grid place-content-center"
            >
              {buttonHovered && !profilePic && (
                <div className="grid place-content-center absolute z-20 top-0 left-0 w-full h-full bg-zinc-950 bg-opacity-90 transition-all duration-300 cursor-pointer">
                  <span className="stroke-white">
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12H18"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18V6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              )}
              {profilePic ? (
                <div>
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profilePic}
                      alt={firstName}
                      className="w-full h-full"
                    />
                  }
                  <button
                    onClick={deleteProfilePic}
                    className="absolute top-2 right-2 pt-1.5 p-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg"
                  >
                    <span className="stroke-white">
                      <svg
                        width="24"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.97 10H3.96997V18C3.96997 21 4.96997 22 7.96997 22H15.97C18.97 22 19.97 21 19.97 18V10Z"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.5 7V8C21.5 9.1 20.97 10 19.5 10H4.5C2.97 10 2.5 9.1 2.5 8V7C2.5 5.9 2.97 5 4.5 5H19.5C20.97 5 21.5 5.9 21.5 7Z"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              ) : (
                <span className="fill-zinc-700">
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </div>
            <input
              type="file"
              ref={fileUploadRef}
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jgp, .svg, .jpeg, .webp"
              className="absolute hidden top-0 left-0 w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[80vw] max-w-[400px]">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Name</h2>
            <div className="flex flex-col gap-4">
            <Input
              value={firstName}
              setValue={setFirstName}
              type="first-name"
            />

            <Input
              value={lastName}
              setValue={setLastName}
              type="last-name"
              error={error}
            />

            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Status</h2>
            <Input value={status} setValue={setStatus} type="status" />
          </div>
          <button
            onClick={updateProfile}
            className="font-bold mt-3 w-full py-[14px] text-black bg-primary rounded-xl hover:text-white hover:bg-zinc-800 hover:bg-opacity-10 transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
