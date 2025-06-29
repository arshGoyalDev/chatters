import { MutableRefObject, useEffect, useRef, useState } from "react";

import { HOST } from "@/utils/constants";

import { useAudioWaveform } from "@/hooks";
import WaveformVisualizer from "./WaveformVisualizer";

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
  const [currentTime, setCurrentTime] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl = `${file ? URL.createObjectURL(file) : `${HOST}/${filePath}`}`;

  const {
    waveformData,
    isLoading: isWaveformLoading,
    error,
  } = useAudioWaveform(audioUrl);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadStart = () => setIsAudioLoading(true);
    const handleCanPlay = () => setIsAudioLoading(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isLoading = isWaveformLoading || isAudioLoading;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="text-red-400 text-center">
          <p className="text-lg font-medium">Error loading audio</p>
          <p className="text-sm opacity-75">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      {isWaveformLoading ? (
        <div className="w-full bg-black py-3 px-2 sm:py-4 sm:px-4 rounded-md">
          <div className="h-7 flex gap-0.5 items-center">
            {Array.from(Array(30).keys()).map((key) => (
              <div
                key={key}
                className={`animate-enlarge w-1 rounded-full transition-all duration-300 bg-zinc-600`}
                style={{
                  height: `${
                    Math.max((((Math.random() * 30) | 0) + 1) * 40, 8) / 15
                  }%`,
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center gap-4 bg-black text-white py-2 px-2 sm:py-3 sm:px-4 rounded-md">
          <button
            className="flex items-center justify-center p-1.5 bg-zinc-900 stroke-white rounded-md"
            onClick={togglePlayPause}
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

          <div className="flex flex-col gap-1">
            {waveformData ? (
              <WaveformVisualizer
                peaks={waveformData.peaks}
                currentTime={currentTime}
                duration={waveformData.duration}
                isPlaying={isPlaying}
                onSeek={handleSeek}
              />
            ) : (
              <div className="flex items-center justify-center h-12">
                <div className="text-white/40 text-sm">No audio data</div>
              </div>
            )}
            <div className="flex justify-between">
              <p className="md:text-sm font-semibold">
                {filename.length > 12
                  ? filename.substring(0, 12) + "..."
                  : filename}
              </p>
              <div>
                <span>
                  {`${Math.floor(currentTime / 60) | 0}`.padStart(2, "0") +
                    ":" +
                    `${currentTime % 60 | 0}`.padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AudioPlayer;
