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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,126,125,0.15),transparent_70%)]"></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
              CHATTERS
            </span>
          </h2>
          <p className="text-zinc-400">Connect with the world</p>
        </div>

        <div className="w-full max-w-lg relative">
          <div className="relative aspect-[17/10] w-full overflow-hidden rounded-xl border border-zinc-800 shadow-xl shadow-black/30">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-10 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-zinc-600 hover:bg-zinc-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
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
