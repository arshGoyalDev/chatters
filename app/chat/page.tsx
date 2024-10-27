import { Chat, SideMenu } from "@/components/chat";

const ChatPage = () => {
  return (
    <main className="flex h-screen overflow-hidden">
      <SideMenu />
      <Chat />
    </main>
  );
};
export default ChatPage;
