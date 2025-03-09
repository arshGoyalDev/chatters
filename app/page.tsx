"use client";

import { useEffect, useRef, useState } from "react";
import { TransitionLink } from "@/components/animations";
import Image from "next/image";

const HomePage = () => {
  return (
    <main className="min-h-screen text-white">
      <nav className="flex flex-wrap gap-4 justify-between items-center w-[90vw] max-w-[1000px] py-4 px-6 mx-auto my-10 border-2 border-neutral-800 rounded-lg">
        <div>
          <span className="font-bold uppercase text-xl">Chatters</span>
        </div>

        <div>
          <TransitionLink
            href="/auth"
            className="flex items-center gap-2 bg-primary font-bold text-white py-2 px-4 rounded-lg"
          >
            <span>Get Started</span>
            <span className="stroke-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                  strokeWidth="3.0"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 12H20.33"
                  strokeWidth="3.0"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </TransitionLink>
        </div>
      </nav>

      <section className="px-4 md:px-20 lg:px-40 py-16 xl:py-40">
        <div className="container mx-auto max-w-7xl z-10">
          <div className="flex flex-col  lg:flex-row items-center gap-12">
            <div className="flex-1 text-center">
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-medium mb-10">
                <span className="text-white from-white to-primary leading-[3.5rem] md:leading-[5rem] xl:leading-[7rem]">
                  Welcome to a{" "}
                  <span className="text-primary font-bold">relaxing</span>{" "}
                  <br /> chat experience
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 mb-8">
                A modern chat experience like no other. Connect with the world{" "}
                <span className="text-primary font-bold relative inline-block">
                  without a sec of delay
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 100 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 5C20 -1.66667 40 -1.66667 60 5C80 11.6667 100 11.6667 120 5"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </span>
                .
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <TransitionLink
                  href="/auth"
                  className="py-3 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 duration-300"
                >
                  Get Started
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1000px] mx-auto h-fit mt-20">
          <img src={"/chat-app.png"} alt="chat app screenshot" />
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-zinc-950/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 feature-card">
              Awesome Features
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto feature-card">
              Discover what makes Chatters the ultimate messaging platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">Real-time Messaging</h3>
              <p className="text-zinc-400 mb-4">
                Send and receive messages instantly with our lightning-fast
                infrastructure.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src="/chat.png"
                  alt="Real-time Messaging"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>

            <div className="feature-card bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">Share Files</h3>
              <p className="text-zinc-400 mb-4">
                Share documents, images, audios and more relevant to your chats.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src="/chat-2.png"
                  alt="Share Files"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>

            <div className="feature-card bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">Blazing Fast</h3>
              <p className="text-zinc-400 mb-4">
                Optimized for speed and performance, ensuring smooth
                communication.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src="/chat-3.png"
                  alt="Blazing Fast"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>

            <div className="feature-card bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">Group Chats</h3>
              <p className="text-zinc-400 mb-4">
                Create and manage group conversations with friends, family, or
                colleagues with ease.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src="/new-group-chat.png"
                  alt="Group Chats"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>

            <div className="feature-card bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
              <p className="text-zinc-400 mb-4">
                Access your chats from any device with our seamless
                cross-platform experience.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src="/chat-4.png"
                  alt="Cross-Platform"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>

            <div className="feature-card bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">Custom Profiles</h3>
              <p className="text-zinc-400 mb-4">
                Personalize your profile with custom avatars, statuses, and
                themes to express your unique style.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src="/profile.png"
                  alt="Custom Profiles"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="cta-content bg-zinc-900 p-8 md:p-12 rounded-2xl border border-zinc-800 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start chatting?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users already enjoying the Chatters experience.
              Sign up today and connect with the world.
            </p>

            <TransitionLink
              href="/auth"
              className="py-4 px-10 text-xl font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 duration-300"
            >
              Get Started Now
            </TransitionLink>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold">CHATTERS</div>
            <div className="text-zinc-500">
              {" "}
              2025 Chatters. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
