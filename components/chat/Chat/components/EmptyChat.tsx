const EmptyChat = () => {
  return (
    <div className="grid place-content-center h-screen text-center gap-4">
      <h1 className="font-extrabold text-5xl">CHATERS</h1>
      <p className="w-[400px] text-xl">Select a chat from the chat list to view message <span className="font-bold text-2xl">OR</span> search contacts to start new chats</p>
      <p className="w-[400px] text-xl">Invite your friends and family to chaters to chat with them</p>
    </div>
  );
};
export default EmptyChat;
