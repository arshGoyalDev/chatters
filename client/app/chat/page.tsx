"use client"

import { Chat, ModalContainer, SideMenu, Lightbox } from "@/components/chat";

import { useLightbox } from "@/context";

const ChatPage = () => {
  const { lightboxActive } = useLightbox();
  return (
    <main className="flex h-screen overflow-hidden">
      <SideMenu />
      <Chat />
      <ModalContainer />

      {lightboxActive && <Lightbox />}
    </main>
  );
};

export default ChatPage;
