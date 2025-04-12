import { HOST } from "@/utils/constants";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const AudioPlayer = ({
  filePath,
  file,
  filename,
}: {
  filename: string;
  filePath?: string;
  file?: File;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioData, setAudioData] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(`${file ? URL.createObjectURL(file) : `${HOST}/${filePath}`}`);

    audioRef.current.onloadedmetadata = () => {
      if (audioRef.current?.duration) setDuration(audioRef?.current?.duration);
      setAudioData(generateWaveform(25, 20));
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const generateWaveform = (count: number, maxHeight: number) => {
    return Array.from({ length: count }, () =>
      Math.max(5, Math.floor(Math.random() * maxHeight))
    );
  };

  const updateProgress = (
    audioRef: MutableRefObject<HTMLAudioElement | null>,
    setCurrentTime: (value: number) => void,
    animationRef: MutableRefObject<number | null>
  ) => {
    if (audioRef.current) setCurrentTime(audioRef.current?.currentTime);
    animationRef.current = requestAnimationFrame(() =>
      updateProgress(audioRef, setCurrentTime, animationRef)
    );
  };

  const togglePlayPause1 = () => {
    if (!isPlaying) {
      audioRef?.current?.play();
      animationRef.current = requestAnimationFrame(() =>
        updateProgress(audioRef, setCurrentTime, animationRef)
      );
    } else {
      audioRef?.current?.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
    setIsPlaying(!isPlaying);
  };

  const getActiveBarCount = (
    currentTime: number,
    duration: number,
    totalBars: number
  ) => {
    if (duration === 0) return 0;
    return Math.floor((currentTime / duration) * totalBars);
  };

  const activeCount1 = getActiveBarCount(
    currentTime,
    duration,
    audioData.length
  );

  return (
    <div className="w-full flex items-center gap-4 bg-black text-white py-2 px-2 sm:py-3 sm:px-4 rounded-md">
      <button
        className="flex items-center justify-center p-1.5 bg-zinc-900 stroke-white rounded-md"
        onClick={togglePlayPause1}
      >
        {isPlaying ? (
          <svg
            width="20"
            height="20"
            fill="none"
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
            width="20"
            height="20"
            fill="none"
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
      </button>

      <div className="flex flex-col-reverse gap-1">
        <p className="md:text-sm font-semibold">
          {filename.length > 20 ? filename.substring(0, 20) + "..." : filename}
        </p>
        <div className="flex items-center h-4 md:h-5 gap-0.5 flex-grow">
          {audioData.map((height, index) => (
            <div
              key={index}
              className={`rounded-sm md:h-5 ${
                index < activeCount1 ? "bg-white" : "bg-zinc-700"
              }`}
              style={{
                height: `${height}px`,
                width: "2px",
                opacity: index % 3 === 0 ? 0.9 : 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AudioPlayer;
