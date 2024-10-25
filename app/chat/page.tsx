import { Chat, ChatList } from "@/components/chat";

const ChatPage = () => {
  return (
    <main className="flex h-screen overflow-hidden">
      <ChatList />
      <Chat />
    </main>
  );
};
export default ChatPage;
