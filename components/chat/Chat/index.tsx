import { EmptyChat } from "./components";

const Chat = () => {
  return (
    <main className="absolute top-0 left-0 md:static w-full h-screen md:w-[62vw] lg:w-[70vw] xl:w-[75vw] 2xl:w-[80vw]">
      <EmptyChat />
    </main>
  );
};

export default Chat;
