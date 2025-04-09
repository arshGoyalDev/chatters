import { Chat, LightBox, ModalContainer, SideMenu } from "@/components/chat";

const ChatPage = () => {
  return (
    <main className="flex h-screen overflow-hidden">
      <SideMenu />
      <Chat />
      <ModalContainer />
      <LightBox />
    </main>
  );
};

export default ChatPage;
