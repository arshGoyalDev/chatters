/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { apiClient } from "@/lib/api-client";
import { HOST, UPLOAD_FILE_ROUTE } from "@/utils/constants";

const SelectFileMenu = ({
  setFileMenu,
  filePath,
  setFilePath,
}: {
  setFileMenu: Dispatch<SetStateAction<boolean>>;
  filePath: string;
  setFilePath: Dispatch<SetStateAction<string>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileType, setFileType] = useState("");

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setFileType("file");
    checkForImage();
    checkForVideo();
    checkForAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
        });

        setFilePath(response.data.filePath);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkForImage = () => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    if (imageRegex.test(filePath)) {
      setFileType("image");
    }
  };

  const checkForVideo = () => {
    const videoRegex = /\.(mp4|ogg|webm)$/i;
    if (videoRegex.test(filePath)) {
      setFileType("video");
    }
  };

  const checkForAudio = () => {
    const audioRegex = /\.(mp3|wav|ogg)$/i;
    if (audioRegex.test(filePath)) {
      setFileType("audio");
    }
  };

  return (
    <div className="absolute bottom-20 right-0 w-[85vw] max-w-[440px] bg-zinc-900 rounded-lg">
      <div className="flex items-center justify-between py-4 px-4">
        <h2 className="text-lg font-semibold">Select File</h2>
        <button
          onClick={() => setFileMenu(false)}
          className="stroke-white rotate-45"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18V6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="px-4 pb-4 grid place-content-center">
        <div className="relative w-60 h-60 md:w-[400px] md:h-[400px] grid place-content-center bg-zinc-800 rounded-lg overflow-hidden">
          {filePath !== "" ? (
            <div>
              {fileType === "image" && (
                <img
                  src={`${HOST}/${filePath}`}
                  alt={filePath}
                  className="w-full h-full"
                />
              )}

              <button
                onClick={() => setFilePath("")}
                className="z-30 absolute top-2 right-2 pt-1.5 p-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg"
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
            // <div className="grid place-content-center absolute z-20 top-0 left-0 w-full h-full bg-zinc-950 bg-opacity-90 transition-all duration-300 cursor-pointer">
            <span className="stroke-zinc-600 fill-zinc-600">
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                  strokeW-dth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            // </div>
          )}
          <button
            onClick={handleAttachmentClick}
            className="absolute w-full h-full"
          ></button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAttachmentChange}
          />
        </div>
      </div>
    </div>
  );
};
export default SelectFileMenu;
