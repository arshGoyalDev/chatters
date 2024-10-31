import { Chat, ModalContainer, SideMenu } from "@/components/chat";

const ChatPage = () => {
  return (
    <main className="flex h-screen overflow-hidden">
      <SideMenu />
      <Chat />
      <ModalContainer />
    </main>
  );
};
export default ChatPage;
