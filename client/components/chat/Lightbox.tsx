"use client";

import { useLightbox } from "@/context";

import { HOST } from "@/utils/constants";

import { MediaGallery } from "./ui";
import { apiClient } from "@/lib/api-client";

const Lightbox = () => {
  const { media, activeIndex, setActiveIndex, setLightboxActive } =
    useLightbox();

  const downloadFile = async () => {
    if (!media || !media[activeIndex]) return;
    try {
      const response = await apiClient.get(
        `${HOST}/${media[activeIndex].url}`,
        {
          responseType: "blob",
        }
      );

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = urlBlob;
      link.setAttribute(
        "download",
        media[activeIndex].url
          ? media[activeIndex].url.split("/")[
              media[activeIndex].url.split("/").length - 1
            ]
          : ""
      );

      document.body.appendChild(link);

      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-30">
      <div
        onClick={() => setLightboxActive(false)}
        className="absolute z-40 w-full h-full bg-zinc-950/50"
      ></div>
      <div className="z-50 fixed h-[95vh] left-1/2 -translate-x-1/2 w-[96vw] flex flex-col bottom-0 bg-zinc-950 rounded-t-2xl border-2 border-b-0 border-zinc-800">
        <div className="flex justify-between py-3 px-3 border-b-2 border-zinc-800">
          <button
            onClick={() => setLightboxActive(false)}
            className="py-1.5 px-2 hover:bg-zinc-900/80 rounded-md"
          >
            <span className="stroke-white">
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
            </span>
          </button>
          <button
            onClick={downloadFile}
            className="py-1.5 px-3 border-2 border-zinc-800 hover:bg-zinc-900/80 rounded-md"
          >
            <span className="stroke-white">
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.0699 14.4299L11.9999 20.4999L5.92993 14.4299"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3.5V20.33"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>

        {media && (
          <div className="flex flex-col justify-between flex-1 gap-10">
            <div className="flex-1 flex items-center justify-between gpa-10">
              <button
                onClick={() => {
                  if (activeIndex !== 0) setActiveIndex((prev) => prev - 1);
                }}
                className={`flex items-center justify-center px-8 h-full hover:bg-zinc-900/30 border-2 border-transparent rounded-r-xl transition-all ${
                  activeIndex === 0
                    ? "pointer-events-none opacity-0"
                    : "stroke-white"
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
              <div className="overflow-hidden rounded-lg w-fit grid place-content-center">
                {media[activeIndex].type === "image" && (
                  <img
                    src={`${HOST}/${media[activeIndex].url}`}
                    alt={media[activeIndex].url.split("/").pop() ?? "image"}
                    className="rounded-lg lg:h-[70vh] mx-auto"
                  />
                )}
                {media[activeIndex].type === "video" && (
                  <div className="w-fit rounded-lg mx-auto">
                    <video
                      src={`${HOST}/${media[activeIndex].url}`}
                      controls
                      className="rounded-lg lg:h-[70vh] mx-auto"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  if (activeIndex !== media.length - 1)
                    setActiveIndex((prev) => prev + 1);
                }}
                className={`flex items-center justify-center px-8 h-full border-2 border-transparent hover:bg-zinc-900/30 rounded-l-xl transition-all ${
                  activeIndex === media.length - 1
                    ? "pointer-events-none opacity-0"
                    : "stroke-white"
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
            <MediaGallery />
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
