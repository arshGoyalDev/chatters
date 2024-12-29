/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";

import { HOST } from "@/utils/constants";

const FileDisplay = ({ filePath }: { filePath: string }) => {
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const [fileType, setFileType] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    setFileType("file");
    checkForImage();
    checkForVideo();
    checkForAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

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

  const handleAudioPlay = () => {
    if (currentAudio.current) {
      if (currentAudio.current.paused) {
        currentAudio.current.play();
        setIsAudioPlaying(true);
      } else {
        currentAudio.current.pause();
        setIsAudioPlaying(false);
      }
    }
  };

  return (
    <>
      {fileType === "file" && (
        <div className="w-full flex items-center gap-4 bg-zinc-950 px-4 py-4 rounded-lg">
          <div className="bg-zinc-900 p-3 rounded-lg">
            <span className="stroke-white">
              <svg
                width="28"
                height="28"
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
                <path
                  d="M7 13H13"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 17H11"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <p className="font-semibold">
            {filePath.split("/")[filePath.split("/").length - 1]}
          </p>
        </div>
      )}

      {fileType === "video" && (
        <div className="w-full rounded-lg">
          <div>
            <video
              src={`${HOST}/${filePath}`}
              controls
              className="rounded-lg"
              controlsList="nodownload"
            />
          </div>
          <h2 className="font-semibold px-2 pt-3 pb-1">
            {filePath.split("/")[filePath.split("/").length - 1]}
          </h2>
        </div>
      )}

      {fileType === "image" && (
        <div className="w-full rounded-lg">
          <img
            src={`${HOST}/${filePath}`}
            alt={filePath}
            className="w-full rounded-lg"
          />
          <h2 className="font-semibold px-2 pt-3 pb-1">
            {filePath.split("/")[filePath.split("/").length - 1]}
          </h2>
        </div>
      )}

      {fileType === "audio" && (
        <div className=" flex items-center justify-between gap-4 w-full px-4 py-4 bg-zinc-950 mx-auto rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-zinc-900 rounded-lg">
              <span className="stroke-white">
                <svg
                  width="28"
                  height="28"
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
            </div>
            <div>
              <audio src={`${HOST}/${filePath}`} ref={currentAudio}></audio>
              <h2>
                {filePath.split("/")[filePath.split("/").length - 1].length > 20
                  ? filePath
                      .split("/")
                      [filePath.split("/").length - 1].substring(0, 20) + "..."
                  : filePath.split("/")[filePath.split("/").length - 1]}
              </h2>
              <div className="flex gap-3 items-center">
                <span>
                  {currentAudio.current
                    ? `${Math.floor(
                        currentAudio.current.currentTime / 60
                      )}:${Math.floor(currentAudio.current.currentTime % 60)}`
                    : "00:00"}
                </span>
                <span>/</span>
                <span>
                  {currentAudio.current
                    ? `${Math.floor(
                        currentAudio.current.duration / 60
                      )}:${Math.floor(currentAudio.current.duration % 60)}`
                    : "00:00"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handleAudioPlay}
              className="p-3 bg-zinc-900 rounded-lg"
            >
              <span className="fill-white">
                {isAudioPlaying ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 19.11V4.89C21 3.54 20.43 3 18.99 3H15.36C13.93 3 13.35 3.54 13.35 4.89V19.11C13.35 20.46 13.92 21 15.36 21H18.99C20.43 21 21 20.46 21 19.11Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default FileDisplay;
