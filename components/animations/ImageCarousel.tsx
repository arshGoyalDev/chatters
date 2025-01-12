"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ImageCarousel = ({
  autoSlide = true,
  autoSlideInterval = 3000,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? 6 : curr - 1));
  const next = () => setCurr((curr) => (curr === 6 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative flex flex-col overflow-hidden h-full">
      <div className="flex items-center justify-between gap-3 pt-10 px-10">
        <h2 className="text-4xl font-semibold">Chaters</h2>
        <Link
          href="/"
          className="text-white py-2 px-4 bg-zinc-800 bg-opacity-30 border-2 border-zinc-700 rounded-md"
        >
          Back to Home Page
        </Link>
      </div>

      <div
        className="flex h-full transition-transform items-center ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        <img src="/chat.png" alt="chat" className="object-contain" />
        <img src="/chat-2.png" alt="chat" className="object-contain" />
        <img src="/profile.png" alt="chat" className="object-contain" />
        <img src="/chat-4.png" alt="chat" className="object-contain" />
        <img src="/chat-3.png" alt="chat" className="object-contain" />
        <img src="/new-group-chat.png" alt="chat" className="object-contain" />
        <img src="/interface.png" alt="chat" className="object-contain" />
      </div>

      <div className="absolute w-full bottom-6 flex justify-center gap-1">
        <div className={`${curr === 0 ? "w-12 bg-white" : "w-10 bg-zinc-700"} h-1 rounded-xl transition duration-200`}></div>
        <div className={`${curr === 1 ? "w-12 bg-white" : "w-10 bg-zinc-700"} h-1 rounded-xl transition duration-200`}></div>
        <div className={`${curr === 2 ? "w-12 bg-white" : "w-10 bg-zinc-700"} h-1 rounded-xl transition duration-200`}></div>
        <div className={`${curr === 3 ? "w-12 bg-white" : "w-10 bg-zinc-700"} h-1 rounded-xl transition duration-200`}></div>
        <div className={`${curr === 4 ? "w-12 bg-white" : "w-10 bg-zinc-700"} h-1 rounded-xl transition duration-200`}></div>
        <div className={`${curr === 5 ? "w-12 bg-white" : "w-10 bg-zinc-700"} h-1 rounded-xl transition duration-200`}></div>
        <div className={`${curr === 6 ? "w-12 bg-white" : "w-10 bg-zinc-700"} h-1 rounded-xl transition duration-200`}></div>
      </div>
    </div>
  );
};

export default ImageCarousel;
