"use client";

import useAppStore from "@/store";
import { Message } from "@/utils/types";

import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface LightboxContextType {
  path: string | null;
  setPath: Dispatch<SetStateAction<string | null>>;
  fileMessages: Message[];
}

const LightboxContext = createContext<LightboxContextType>({
  path: null,
  setPath: () => {},
  fileMessages: [],
});

const useLightbox = () => useContext(LightboxContext);

const LightboxProvider = ({ children }: { children: ReactElement }) => {
  const { messages } = useAppStore();

  const [fileMessages, setFileMessages] = useState<Message[]>([]);
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    const files = messages.filter((message) => message.messageType === "file");

    setFileMessages(files);
  }, [messages]);

  return (
    <LightboxContext.Provider value={{ path, setPath, fileMessages }}>
      {children}
    </LightboxContext.Provider>
  );
};

export { useLightbox };
export default LightboxProvider;
