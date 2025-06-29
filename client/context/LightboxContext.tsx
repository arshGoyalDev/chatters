"use client";

import useAppStore from "@/store";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface Media {
  url: string;
  type: string;
}

interface LightboxContextType {
  media: Media[] | null;
  lightboxActive: boolean;
  setLightboxActive: Dispatch<SetStateAction<boolean>>;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setPath: Dispatch<SetStateAction<string | null>>;
}

const LightboxContext = createContext<LightboxContextType>({
  media: null,
  lightboxActive: false,
  setLightboxActive: () => {},
  activeIndex: 0,
  setActiveIndex: () => {},
  setPath: () => {},
});

const useLightbox = () => useContext(LightboxContext);

const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [media, setMedia] = useState<Media[] | null>(null);
  const [path, setPath] = useState<string | null>(null);

  const [lightboxActive, setLightboxActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { messages } = useAppStore();

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

  const getMedia = () => {
    if (messages) {
      const fileMessages = messages.filter(
        (message) => message.messageType === "file"
      );

      let newMedia: {
        url: string;
        type: string;
      }[] = [];

      fileMessages.forEach((message) => {
        if (message.fileUrls) {
          message.fileUrls.map((file) => {
            const fileType = checkForFileType(file);

            if (fileType === "image" || fileType === "video") {
              newMedia.push({
                url: file,
                type: fileType,
              });
            }
          });
        }
      });

      if (newMedia.length > 0) {
        setMedia(newMedia);
      }
    }
  };

  useEffect(() => {
    if (messages && lightboxActive) getMedia();
  }, [messages, lightboxActive]);

  useEffect(() => {
    if (path) {
      media?.forEach((item, index) => {
        if (item.url === path) {
          setActiveIndex(index);
        }
      });

      setLightboxActive(true);
    }
  }, [path]);

  useEffect(() => {
    setPath(null);
  }, [lightboxActive]);

  return (
    <LightboxContext.Provider
      value={{
        media,
        lightboxActive,
        setLightboxActive,
        activeIndex,
        setActiveIndex,
        setPath,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export { useLightbox };
export default LightboxProvider;
