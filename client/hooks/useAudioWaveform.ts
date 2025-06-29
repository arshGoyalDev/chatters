"use client";

import { useState, useEffect, useRef } from "react";

interface WaveformData {
  peaks: number[];
  duration: number;
}

const useAudioWaveform = (audioUrl: string) => {
  const [waveformData, setWaveformData] = useState<WaveformData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioUrl) return;

    const generateWaveform = async () => {
      setIsLoading(true);
      setError(null);

      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();

        const audioBuffer =
          await audioContextRef.current.decodeAudioData(arrayBuffer);

        const channelData = audioBuffer.getChannelData(0);
        const duration = audioBuffer.duration;

        const targetBars = 30;
        const samplesPerBar = Math.floor(channelData.length / targetBars);
        const peaks: number[] = [];

        for (let i = 0; i < targetBars; i++) {
          const start = i * samplesPerBar;
          const end = Math.min(start + samplesPerBar, channelData.length);

          let max = 0;
          for (let j = start; j < end; j++) {
            const abs = Math.abs(channelData[j]);
            if (abs > max) max = abs;
          }

          peaks.push(Math.max(max, 0.1));
        }

        setWaveformData({ peaks, duration });
      } catch (err) {
        setError("Failed to load audio file");
        console.error("Waveform generation error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    generateWaveform();

    return () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, [audioUrl]);

  return { waveformData, isLoading, error };
};

export { useAudioWaveform };
