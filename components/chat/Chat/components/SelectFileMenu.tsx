/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

import FileDisplay from "./FileDisplay";

import { useError } from "@/context";

const SelectFileMenu = ({
  setFileMenu,
  filePath,
  setFilePath,
  file,
  setFile,
}: {
  setFileMenu: Dispatch<SetStateAction<boolean>>;
  filePath: string;
  setFilePath: Dispatch<SetStateAction<string>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="absolute bottom-16 -right-2 w-[85vw] max-w-[400px] bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950">
      <div className="flex items-center justify-between py-4 px-4">
        <h2 className="text-lg font-semibold">Select File</h2>
        <button
          onClick={() => {
            setFilePath("");
            setFile(null);
            setFileMenu(false);
          }}
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
      <div className="px-4 pb-4 flex items-center justify-center">
        <div className="relative w-60 min-h-60 md:w-[360px] md:min-h-[360px] md:h-fit grid place-content-center bg-zinc-800 rounded-lg overflow-hidden">
          {filePath && file ? (
            <div className="z-20 w-[60] md:w-[360px] px-3 pt-3 pb-2">
              <FileDisplay filePath={filePath} file={file} />

              <button
                onClick={() => setFilePath("")}
                className="z-30 absolute top-2 right-2 pt-1.5 p-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg"
              >
                <span className="stroke-white">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      stroke="rgb(39 39 42)"
                      width="23"
                      height="23"
                    />
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
            </div>
          ) : (
            <span className="stroke-zinc-600">
              <svg
                width="50"
                height="50"
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
          <button
            onClick={handleAttachmentClick}
            className="absolute w-full h-full"
          ></button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files![0];
              setFile(file);
              setFilePath(file ? URL.createObjectURL(file) : "");
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default SelectFileMenu;
