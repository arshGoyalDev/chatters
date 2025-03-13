/* eslint-disable @next/next/no-img-element */

import { HOST } from "@/utils/constants";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import AudioPlayer from "./AudioPlayer";

const FileDisplay = ({ filePath, file }: { filePath: string; file?: File }) => {
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const [fileType, setFileType] = useState("file");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setFileType("file");
    checkForImage();
    checkForVideo();
    checkForAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  useEffect(() => {
    if (file) {
      setFileName(file.name);
    } else setFileName(filePath.split("/")[filePath.split("/").length - 1]);
  }, [file]);

  const checkForImage = () => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    if (imageRegex.test(fileName)) {
      setFileType("image");
    }
  };

  const checkForVideo = () => {
    const videoRegex = /\.(mp4|ogg|webm)$/i;
    if (videoRegex.test(fileName)) {
      setFileType("video");
    }
  };

  const checkForAudio = () => {
    const audioRegex = /\.(mp3|wav|ogg)$/i;
    if (audioRegex.test(fileName)) {
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
            {fileName.length > 30
              ? fileName.substring(0, 30) + "..."
              : fileName}
          </p>
        </div>
      )}

      {fileType === "video" && (
        <div className="w-full h-fit rounded-lg">
          <div>
            <video
              src={`${file ? filePath : `${HOST}/${filePath}`}`}
              controls
              className="rounded-lg"
              controlsList="nodownload"
            />
          </div>
          <h2 className="font-semibold px-2 pt-3 pb-1">{fileName}</h2>
        </div>
      )}

      {fileType === "image" && (
        <div className="w-full h-fit rounded-lg">
          <img
            src={`${file ? filePath : `${HOST}/${filePath}`}`}
            alt={filePath}
            className="w-full rounded-lg"
          />
          <h2 className="font-semibold px-2 pt-3 pb-1">{fileName}</h2>
        </div>
      )}

      {fileType === "audio" && (
        <AudioPlayer filePath={filePath} file={file} fileName={fileName} />
      )}
    </>
  );
};
export default FileDisplay;
