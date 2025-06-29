import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import Document from "./Document";
import Image from "next/image";

const FilesViewer = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<FileList | null>>;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [addedFiles, setAddedFiles] = useState<FileList | null>(null);

  const checkForFileType = (
    filename: string
  ): "image" | "video" | "audio" | "file" => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    if (imageRegex.test(filename)) {
      return "image";
    }
    const videoRegex = /\.(mp4|ogg|webm)$/i;
    if (videoRegex.test(filename)) {
      return "video";
    }
    const audioRegex = /\.(mp3|wav|ogg)$/i;
    if (audioRegex.test(filename)) {
      return "audio";
    }
    return "file";
  };

  const getVisibleFileIndexes = () => {
    if (files.length <= 5) {
      return Array.from({ length: files.length }, (_, i) => i);
    }

    let startIndex = Math.max(0, activeIndex - 2);
    let endIndex = startIndex + 4;

    if (endIndex >= files.length) {
      endIndex = files.length - 1;
      startIndex = Math.max(0, endIndex - 4);
    }

    return Array.from({ length: 5 }, (_, i) => startIndex + i).filter(
      (index) => index < files.length
    );
  };

  useEffect(() => {
    if (addedFiles) {
      const newFiles = files;

      Array.from(addedFiles).forEach((file) => {
        let matchFound = false;

        newFiles.forEach((f) => {
          if (file.name === f.name) {
            matchFound = true;
          }
        });

        if (!matchFound) newFiles.push(file);
      });

      const newFileList = new DataTransfer();
      newFiles.forEach((file) => {
        newFileList.items.add(file);
      });

      setFiles(newFileList.files);
    }
  }, [addedFiles]);

  const removeFile = () => {
    if (files.length === 1) {
      setFiles(null);
      return;
    }

    const newFiles = files.filter((_, index) => index !== activeIndex);
    if (newFiles.length > 0) setActiveIndex(0);

    const newFileList = new DataTransfer();
    newFiles.forEach((file) => {
      newFileList.items.add(file);
    });

    setFiles(newFileList.files);
  };

  return (
    <>
      <div className="relative w-full flex h-full flex-1 items-center justify-between gap-2 md:gap-8 py-4 px-2 md:px-8">
        <div className="z-20 absolute top-2 right-2 flex items-center gap-2">
          <button
            onClick={removeFile}
            className="p-1 bg-zinc-950 border-2 border-zinc-800 rounded-md"
          >
            <span className="stroke-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" y="0.5" width="23" height="23" stroke="black" />
                <path
                  d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.33 16.5H13.66"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 12.5H14.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <div>
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              className="p-1 bg-primary border-2 border-zinc-800 rounded-md"
            >
              <span className="stroke-black">
                <svg
                  width="20"
                  height="20"
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
              </span>
            </button>
            <input
              type="file"
              name="files"
              className="hidden"
              multiple
              ref={fileInputRef}
              onChange={(e) => setAddedFiles(e.target.files)}
            />
          </div>
        </div>
        <button
          onClick={() => {
            if (activeIndex !== 0) setActiveIndex((prev) => prev - 1);
          }}
          className={`p-1 rounded-md ${
            activeIndex === 0
              ? "pointer-events-none bg-neutral-700/80 stroke-neutral-500"
              : "bg-primary stroke-black"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="overflow-hidden rounded-lg w-fit">
          {checkForFileType(files[activeIndex].name) === "image" && (
            <div className="relative max-w-[240px] max-h-[240px] rounded-md overflow-hidden">
              <img
                src={URL.createObjectURL(files[activeIndex])}
                alt={files[activeIndex].name}
                className="max-h-[240px]"
              />
            </div>
          )}
          {checkForFileType(files[activeIndex].name) === "video" && (
            <VideoPlayer
              url={URL.createObjectURL(files[activeIndex])}
              locally={true}
            />
          )}
          {checkForFileType(files[activeIndex].name) === "audio" && (
            <AudioPlayer
              file={files[activeIndex]}
              filename={files[activeIndex].name}
            />
          )}
          {checkForFileType(files[activeIndex].name) === "file" && (
            <Document
              filename={files[activeIndex].name}
              filePath={URL.createObjectURL(files[activeIndex])}
            />
          )}
        </div>
        <button
          onClick={() => {
            if (activeIndex !== files.length - 1)
              setActiveIndex((prev) => prev + 1);
          }}
          className={`p-1 rounded-md ${
            activeIndex === files.length - 1
              ? "pointer-events-none bg-neutral-700/80 stroke-neutral-500"
              : "bg-primary stroke-black"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="px-4 pb-2">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 w-full">
          {files.length > 1 && (
            <div className="flex items-center gap-2">
              {getVisibleFileIndexes().map((fileIndex) => (
                <div
                  key={fileIndex}
                  onClick={() => setActiveIndex(fileIndex)}
                  className={`cursor-pointer transition-all duration-200 ${
                    fileIndex === activeIndex
                      ? "border-2 border-primary"
                      : "border-2 border-zinc-800 opacity-70 hover:opacity-100"
                  } rounded-md overflow-hidden h-10 w-10 flex items-center justify-center`}
                >
                  {checkForFileType(files[fileIndex].name) === "image" && (
                    <div className="relative w-10 aspect-square rounded-md overflow-hidden">
                      <Image
                        src={URL.createObjectURL(files[fileIndex])}
                        fill
                        sizes="100%"
                        alt={files[fileIndex].name}
                        className="w-full h-full"
                        priority
                      />
                    </div>
                  )}
                  {checkForFileType(files[fileIndex].name) === "video" && (
                    <div className="bg-zinc-950 stroke-white h-full w-full flex items-center justify-center">
                      <span className="stroke-white">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                  {checkForFileType(files[fileIndex].name) === "audio" && (
                    <div className="bg-zinc-950 stroke-white h-full w-full flex items-center justify-center">
                      <span className="stroke-white">
                        <svg
                          width="20"
                          height="20"
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
                  )}
                  {checkForFileType(files[fileIndex].name) === "file" && (
                    <div className="bg-zinc-950 stroke-white h-full w-full flex items-center justify-center">
                      <span className="stroke-white">
                        <svg
                          width="20"
                          height="20"
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
                      </span>{" "}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center">
          <div className="text-sm text-zinc-500 font-semibold flex items-center gap-1.5">
            <span className="text-white">{activeIndex + 1}</span>
            <span>of {files.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default FilesViewer;
