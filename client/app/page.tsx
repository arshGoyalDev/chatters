"use client";

import { useRef } from "react";
import Image from "next/image";
import useAppStore from "@/store";
import Link from "next/link";

const HomePage = () => {
  const { userInfo } = useAppStore();
  const featureItemsRef = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !featureItemsRef.current.includes(el)) {
      featureItemsRef.current.push(el);
    }
  };

  return (
    <main className="min-h-screen text-white">
      <nav className="flex flex-wrap gap-4 justify-between items-center w-[90vw] max-w-[1400px] py-8 px-6 mx-auto">
        <div>
          <span className="font-bold uppercase text-xl">Chatters</span>
        </div>

        <div>
         {userInfo.email ? (
           <Link href="/chat" className="bg-primary font-semibold text-black py-2 px-4 rounded-md">
             <span>Chat</span>
           </Link>
         ) : (
         <Link
           href="/auth"
           className="flex items-center gap-2 bg-primary font-semibold text-black py-2 px-4 rounded-md"
         >
           <span>Get Started</span>
           <span className="stroke-black">
             <svg
               width="14"
               height="14"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                 strokeWidth="2.0"
                 strokeMiterlimit="10"
                 strokeLinecap="round"
                 strokeLinejoin="round"
               />
               <path
                 d="M3.5 12H20.33"
                 strokeWidth="2.0"
                 strokeMiterlimit="10"
                 strokeLinecap="round"
                 strokeLinejoin="round"
               />
             </svg>
           </span>
         </Link>
         )}
        </div>
      </nav>

      <section className="px-4 md:px-20 lg:px-40 py-16 xl:py-32">
        <div className="container mx-auto max-w-7xl z-10">
          <div className="flex flex-col  lg:flex-row items-center gap-12">
            <div className="flex-1 text-center">
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-medium mb-10">
                <span className="from-white to-primary leading-[3.5rem] md:leading-[5rem] xl:leading-[7rem]">
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
                <Link
                  href="/auth"
                  className="py-3 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-black rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1000px] mx-auto h-fit mt-20">
          <img src={"/group-chat.png"} alt="chat app screenshot" className="rounded-xl" />
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-primary">Features</span> that make chatting better
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="feature-item flex flex-col items-center bg-zinc-900 rounded-xl">
              <div className="w-full">  
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/new-chat.png"
                    alt="New Chat"
                    fill
                    className="object-cover rounded-t-xl rounded-b-md"
                  />
                </div>
              </div>
              <div className="w-full px-4 py-4">
                <h3 className="text-2xl font-semibold mb-2">Instant Connections</h3>
                <p className="text-zinc-400 text-lg">Start new conversations with anyone, anywhere, instantly. Our lightning-fast connection system ensures you're always just a click away from your next great conversation.</p>
              </div>
            </div>

            <div className="feature-item flex flex-col items-center bg-zinc-900 rounded-xl">
              <div className="w-full">
                <div className="relative h-64 rounded-xl">
                  <Image
                    src="/group-chat.png"
                    alt="Group Chat"
                    fill
                    className="object-cover rounded-t-xl rounded-b-md"
                  />
                </div>
              </div>
              <div className="w-full px-4 py-4">
                <h3 className="text-2xl font-semibold mb-2">Group Chats</h3>
                <p className="text-zinc-400 text-lg">Create and manage group conversations with ease. Whether it's for work, friends, or family, our group chat feature makes staying connected simple and fun.</p>
              </div>
            </div>

            <div className="feature-item flex flex-col items-center bg-zinc-900 rounded-xl">
              <div className="w-full">
                <div className="relative h-64 rounded-xl">
                  <Image
                    src="/send-files.png"
                    alt="Send Files"
                    fill
                    className="object-cover rounded-t-xl rounded-b-md"
                  />
                </div>
              </div>
              <div className="w-full px-4 py-4">
                <h3 className="text-2xl font-semibold mb-2">File Sharing</h3>
                <p className="text-zinc-400 text-lg">Share files and media seamlessly with your contacts. From documents to photos, our platform makes sharing quick and secure.</p>
              </div>
            </div>

            <div className="feature-item flex flex-col items-center bg-zinc-900 rounded-xl">
              <div className="w-full">
                <div className="relative h-64 rounded-xl">
                  <Image
                    src="/chat-info.png"
                    alt="Chat Info"
                    fill
                    className="object-cover rounded-t-xl rounded-b-md"
                  />
                </div>
              </div>
              <div className="w-full px-4 py-4">
                <h3 className="text-2xl font-semibold mb-2">Detailed Chat Info</h3>
                <p className="text-zinc-400 text-lg">Access comprehensive information about your conversations. Stay organized with detailed chat history and participant information.</p>
              </div>
            </div>

            <div className="feature-item flex flex-col items-center bg-zinc-900 rounded-xl">
              <div className="w-full">
                <div className="relative h-64 rounded-xl">
                  <Image
                    src="/add-members.png"
                    alt="Add Members"
                    fill
                    className="object-cover rounded-t-xl rounded-b-md"
                  />
                </div>
              </div>
              <div className="w-full px-4 py-4">
                <h3 className="text-2xl font-semibold mb-2">Easy Member Management</h3>
                <p className="text-zinc-400 text-lg">Add and manage group members with a simple interface. Control who's in your conversations with intuitive member management tools.</p>
              </div>
            </div>

            <div className="feature-item flex flex-col items-center bg-zinc-900 rounded-xl">
              <div className="w-full">
                <div className="relative h-64 rounded-xl">
                  <Image
                    src="/personal-chat.png"
                    alt="Personal Chat"
                    fill
                    className="object-cover rounded-t-xl rounded-b-md"
                  />
                </div>
              </div>
              <div className="w-full px-4 py-4">
                <h3 className="text-2xl font-semibold mb-2">Personal Chats</h3>
                <p className="text-zinc-400 text-lg">Enjoy private, one-on-one conversations with friends. Our personal chat feature ensures your private conversations stay just that - private.</p>
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

            <Link
              href="/auth"
              className="py-4 px-10 text-xl font-semibold bg-primary hover:bg-primary/90 text-black rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 duration-300"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col justify-between items-center gap-4">
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
