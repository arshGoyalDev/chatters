"use client";

import { useState, useRef, MouseEvent } from "react";

interface WaveformVisualizerProps {
  peaks: number[];
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onSeek: (time: number) => void;
}

const WaveformVisualizer = ({
  peaks,
  currentTime,
  duration,
  isPlaying,
  onSeek,
}: WaveformVisualizerProps) => {
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const progress = duration > 0 ? currentTime / duration : 0;

  const handleClick = (event: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickProgress = clickX / rect.width;
    const seekTime = clickProgress * duration;

    onSeek(Math.max(0, Math.min(seekTime, duration)));
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const hoverProgress = mouseX / rect.width;
    setHoverPosition(hoverProgress);
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-end gap-0.5 h-6 cursor-pointer group"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="slider"
      aria-label="Audio progress"
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={currentTime}
    >
      {/* Hover indicator line */}
      {hoverPosition !== null && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/30 pointer-events-none transition-opacity duration-200"
          style={{ left: `${hoverPosition * 100}%` }}
        />
      )}

      {peaks.map((height, index) => {
        const barProgress = index / peaks.length;
        const isPlayed = barProgress < progress;
        const currentBar = barProgress < progress;
        const isHovered =
          hoverPosition !== null &&
          Math.abs(barProgress - hoverPosition) < 0.01;

        return (
          <div
            key={index}
            className={`w-1 rounded-full transition-all duration-300 ${
              isPlayed
                ? "bg-zinc-600"
                : isHovered
                  ? "bg-zinc-300"
                  : "bg-zinc-900"
            } ${isPlaying ? "animate-enlarge" : "animate-none"} hover:bg-white/40`}
            style={{
              height: `${Math.max(height * 80, 8)}%`,
              animationDelay: `${(((Math.random() * 30) | 0) + 1) * 20}ms`,
              animationDuration: "1s",
              transform: isHovered ? "scaleY(1.1)" : "scaleY(1)",
            }}
          />
        );
      })}
    </div>
  );
};

export default WaveformVisualizer;
