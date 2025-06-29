import { useError } from "@/context";

import { apiClient } from "@/lib/api-client";
import { HOST } from "@/utils/constants";

import Image from "next/image";

import { useEffect, useState } from "react";

const File = ({ filePath }: { filePath: string }) => {
  const errorContext = useError();
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    setFileType("file");
    checkForImage();
    checkForVideo();
    checkForAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const downloadFile = async () => {
    try {
      const response = await apiClient.get(`${HOST}/${filePath}`, {
        responseType: "blob",
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = urlBlob;
      link.setAttribute(
        "download",
        filePath ? filePath.split("/")[filePath.split("/").length - 1] : ""
      );

      document.body.appendChild(link);

      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      errorContext?.setErrorMessage("Failed to download file");
    }
  };

  return (
    <div className="flex justify-between items-center py-3 px-3 bg-zinc-800 bg-opacity-5 border-2 border-zinc-800 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="grid place-content-center w-8 h-8 rounded-md overflow-hidden border-2 border-zinc-800">
          {fileType === "image" && (
            <div className="relative w-8 aspect-square rounded-md overflow-hidden">
              <Image src={`${HOST}/${filePath}`}
                fill sizes="100%"
                alt={filePath.split("/").at(-1) || ""}
                className="w-full h-full" priority />
            </div>
          )}
          {fileType === "audio" && (
            <span className="stroke-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.28003 22C8.00316 22 9.40003 20.6031 9.40003 18.88C9.40003 17.1569 8.00316 15.76 6.28003 15.76C4.55691 15.76 3.16003 17.1569 3.16003 18.88C3.16003 20.6031 4.55691 22 6.28003 22Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.84 16.8001V4.60009C20.84 2.00009 19.21 1.64009 17.56 2.09009L11.32 3.79009C10.18 4.10009 9.40002 5.00009 9.40002 6.30009V8.47009V9.93009V18.8701"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.72 19.9199C19.4431 19.9199 20.84 18.5231 20.84 16.7999C20.84 15.0768 19.4431 13.6799 17.72 13.6799C15.9968 13.6799 14.6 15.0768 14.6 16.7999C14.6 18.5231 15.9968 19.9199 17.72 19.9199Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.40002 9.5199L20.84 6.3999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}

          {fileType === "video" && (
            <span className="stroke-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.52002 7.11011H21.48"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.52002 2.11011V6.97011"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.48 2.11011V6.52011"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.75 14.4501V13.2501C9.75 11.7101 10.84 11.0801 12.17 11.8501L13.21 12.4501L14.25 13.0501C15.58 13.8201 15.58 15.0801 14.25 15.8501L13.21 16.4501L12.17 17.0501C10.84 17.8201 9.75 17.1901 9.75 15.6501V14.4501V14.4501Z"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}

          {fileType === "file" && (
            <span className="stroke-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                  strokeWidth="1.5"
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
          )}
        </div>

        <div className="text-sm font-semibold">
          {filePath.split("/")[filePath.split("/").length - 1].length > 25
            ? filePath.split("/").at(-1)?.substring(0, 25) + "..."
            : filePath.split("/").at(-1)}
        </div>
      </div>
      <button onClick={downloadFile}>
        <span className="stroke-white">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 11.51L12 14.51L15 11.51"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14.51V6.51001"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 16.51C9.89 17.81 14.11 17.81 18 16.51"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};
export default File;
