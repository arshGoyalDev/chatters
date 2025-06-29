const EmptyChat = () => {
  return (
    <div className="grid place-content-center h-screen text-center gap-4">
      <h1 className="font-extrabold text-3xl">CHATTERS</h1>
      <p className="w-[400px]">
        Select a chat from the chat list to view message{" "}
        <span className="font-bold text-lg">OR</span> search contacts to start
        new chats
      </p>
      <p className="w-[400px]">
        Invite your friends and family to chatters to chat with them
      </p>
    </div>
  );
};
export default EmptyChat;
