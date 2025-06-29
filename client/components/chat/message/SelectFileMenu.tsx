/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import FilesViewer from "./FilesViewer";

const SelectFileMenu = ({
  setFileMenu,
  filePaths,
  setFilePaths,
  files,
  setFiles,
}: {
  setFileMenu: Dispatch<SetStateAction<boolean>>;
  filePaths: string[] | null;
  setFilePaths: Dispatch<SetStateAction<string[] | null>>;
  files: FileList | null;
  setFiles: Dispatch<SetStateAction<FileList | null>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="z-30 absolute bottom-16 -right-2 w-[90vw] md:min-w-[400px] max-w-[450px] bg-[#121214] border-2 border-zinc-900 rounded-lg shadow-lg shadow-zinc-950">
      <div className="flex items-center justify-between py-2  md:py-4 px-4">
        <h2 className="text-lg font-semibold">Select File</h2>
        <button
          onClick={() => {
            setFilePaths(null);
            setFiles(null);
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
      <div className="px-2 pb-4 md:px-4 md:pb-4 flex items-center justify-center">
        <div
          className={`relative w-full min-h-60 md:min-w-[360px] max-w-[500px] md:min-h-[360px] md:h-fit flex flex-col ${files ? "justify-between" : "justify-center"} bg-zinc-900/80 rounded-lg overflow-hidden`}
        >
          {files ? (
            <FilesViewer files={Array.from(files)} setFiles={setFiles} />
          ) : (
            <div className="grid place-content-center h-full">
              <span className="stroke-zinc-700">
                <svg
                  width="60"
                  height="60"
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
              <button
                onClick={handleAttachmentClick}
                className="absolute top-0 w-full h-full"
              ></button>
              <input
                type="file"
                name="files"
                className="hidden"
                multiple
                ref={fileInputRef}
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SelectFileMenu;
