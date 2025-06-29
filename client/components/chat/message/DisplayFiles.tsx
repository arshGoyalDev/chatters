import { HOST } from "@/utils/constants";

import { useEffect, useState } from "react";

import AudioPlayer from "./AudioPlayer";
import Document from "./Document";
import VideoPlayer from "./VideoPlayer";

import { useLightbox } from "@/context";

const DisplayFiles = ({
  fileUrls,
  sender,
}: {
  fileUrls: string[];
  sender: boolean;
}) => {
  const { setPath } = useLightbox();

  const [imagesOrVideo, setImagesOrVideo] = useState<
    { url: string; type: string }[]
  >([]);
  const [documents, setDocuments] = useState<string[]>([]);
  const [audioFiles, setAudioFiles] = useState<string[]>([]);

  useEffect(() => {
    let tempImagesOrVideo: { url: string; type: string }[] = [];
    let tempAudioFiles: string[] = [];
    let tempDocuments: string[] = [];

    fileUrls.forEach((fileUrl) => {
      const filename = fileUrl.split("/").pop();
      const fileType = checkForFileType(filename ?? "");

      if (fileType === "image" || fileType === "video") {
        tempImagesOrVideo.push({ url: fileUrl, type: fileType });
      } else if (fileType === "audio") {
        tempAudioFiles.push(fileUrl);
      } else {
        tempDocuments.push(fileUrl);
      }
    });

    setImagesOrVideo(tempImagesOrVideo);
    setAudioFiles(tempAudioFiles);
    setDocuments(tempDocuments);
  }, []);

  const checkForFileType = (
    filename: string,
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

  return (
    <div
      className={`flex gap-2 flex-col ${sender ? "items-end" : "items-start"}`}
    >
      {imagesOrVideo.length !== 0 && (
        <div
          className={`grid ${
            imagesOrVideo.length >= 2 && "grid-cols-2"
          } gap-2 w-40 sm:w-full sm:max-w-96 h-fit overflow-hidden rounded-lg p-2 border-2 ${
            sender
              ? "bg-zinc-900 bg-opacity-40 border-zinc-800"
              : "bg-primary bg-opacity-5 border-primary border-opacity-20 text-primary"
          }`}
        >
          {imagesOrVideo.length >= 2 ? (
            <>
              {imagesOrVideo.slice(0, 3).map((file) => (
                <div
                  onClick={() => setPath(file.url)}
                  key={file.url}
                  className="rounded-lg"
                >
                  {file.type === "image" ? (
                    <img
                      src={`${HOST}/${file.url}`}
                      alt={file.url.split("/").pop() ?? "image"}
                      className="rounded-lg aspect-square"
                    />
                  ) : (
                    <VideoPlayer url={file.url} />
                  )}
                </div>
              ))}
              {imagesOrVideo.length > 4 ? (
                <button
                  onClick={() => setPath(imagesOrVideo[3].url)}
                  className={`relative rounded-lg`}
                >
                  <div>
                    <img
                      src={`${HOST}/${imagesOrVideo[3].url}`}
                      alt={imagesOrVideo[3].url.split("/").pop() ?? "image"}
                      className="rounded-lg aspect-square"
                    />
                  </div>
                  <div className="absolute top-0 left-0 flex items-center justify-center gap-2 w-full h-full bg-zinc-950/80 stroke-zinc-200">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12H18"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18V6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-bold text-3xl text-white">
                      {imagesOrVideo.length - 3}
                    </span>
                  </div>
                </button>
              ) : (
                <>
                  {imagesOrVideo[3] && (
                    <div
                      onClick={() => setPath(imagesOrVideo[3].url)}
                      key={imagesOrVideo[3].url}
                      className="rounded-lg"
                    >
                      {imagesOrVideo[3].type === "image" ? (
                        <img
                          src={`${HOST}/${imagesOrVideo[3].url}`}
                          alt={imagesOrVideo[3].url.split("/").pop() ?? "image"}
                          className="rounded-lg aspect-square"
                        />
                      ) : (
                        <VideoPlayer url={imagesOrVideo[3].url} />
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {imagesOrVideo[0] && (
                <div
                  onClick={() => setPath(imagesOrVideo[0].url)}
                  key={imagesOrVideo[0].url}
                  className="rounded-lg"
                >
                  {imagesOrVideo[0].type === "image" ? (
                    <img
                      src={`${HOST}/${imagesOrVideo[0].url}`}
                      alt={imagesOrVideo[0].url.split("/").pop() ?? "image"}
                      className="rounded-lg aspect-square"
                    />
                  ) : (
                    <VideoPlayer url={imagesOrVideo[0].url} />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
      {audioFiles?.map((audio) => (
        <div
          key={audio}
          className={`w-fit  h-fit overflow-hidden rounded-lg p-2 border-2 ${
            sender
              ? "bg-zinc-900 bg-opacity-40 border-zinc-800"
              : "bg-primary bg-opacity-5 border-primary border-opacity-20 text-primary"
          }`}
        >
          <AudioPlayer
            filePath={audio}
            filename={audio.split("/").pop() ?? ""}
          />
        </div>
      ))}
      {documents?.map((document) => (
        <div
          key={document}
          className={`w-fit h-fit overflow-hidden rounded-lg p-2 border-2 ${
            sender
              ? "bg-zinc-900 bg-opacity-40 border-zinc-800"
              : "bg-primary bg-opacity-5 border-primary border-opacity-20 text-primary"
          }`}
        >
          <Document
            filePath={document}
            filename={document.split("/").pop() ?? ""}
          />
        </div>
      ))}
    </div>
  );
};
export default DisplayFiles;
