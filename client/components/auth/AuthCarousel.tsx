"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const AuthCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselItems = [
    {
      image: "/chat.png",
      title: "Real-time Messaging",
      description:
        "Send and receive messages instantly with our lightning-fast real-time messaging system.",
    },
    {
      image: "/chat-2.png",
      title: "Share Files",
      description:
        "Share documents, images, audios and more relevant to your chats.",
    },
    {
      image: "/chat-3.png",
      title: "Group Chats",
      description:
        "Create and manage group conversations with friends, family, or colleagues with ease.",
    },
    {
      image: "/profile.png",
      title: "Personalized Profiles",
      description: "Customize your profile and make it uniquely yours.",
    },
    {
      image: "/interface.png",
      title: "Intuitive Interface",
      description:
        "Navigate through our app with ease thanks to our user-friendly interface.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(161,181,216,0.20),transparent_70%)]"></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-primary">
              CHATTERS
            </span>
          </h2>
          <p className="text-zinc-400">Connect with the world</p>
        </div>

        <div className="text-center mt-5">
          <p className="text-zinc-300 text-lg mb-2">
            Join thousands of users already enjoying Chatters
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-zinc-400">
            <span className="px-3 py-1 bg-zinc-800/50 rounded-full">
              Real-time Chat
            </span>
            <span className="px-3 py-1 bg-zinc-800/50 rounded-full">
              File Sharing
            </span>
            <span className="px-3 py-1 bg-zinc-800/50 rounded-full">
              Group Conversations
            </span>
            <span className="px-3 py-1 bg-zinc-800/50 rounded-full">
              Dark Mode
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCarousel;
