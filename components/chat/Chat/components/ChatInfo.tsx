/* eslint-disable @next/next/no-img-element */
import useAppStore from "@/store";
import { HOST } from "@/utils/constants";

const ChatInfo = () => {
  const {chatData} = useAppStore();

  return (
    <div className="py-20  bg-zinc-900">

      <div className="flex flex-col gap-4 px-10">
        <div className="flex items-center flex-col gap-6">
          <div className="w-52 h-52 rounded-xl overflow-hidden">
            <img src={`${HOST}/${chatData?.chatPic}`} alt={chatData?.chatName} />
          </div>
          <h2 className="px-10 font-bold text-4xl text-center">{chatData?.chatName}</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-zinc-600 font-bold">Status</h3>
            <p className="font-semibold">{chatData?.chatStatus}</p>
          </div>
          <div>
            <h3 className="text-zinc-600 font-bold">Email</h3>
            <p className="font-semibold">{chatData?.chatMembers[0].email}</p>
          </div>

        </div>
      </div>

    </div>
  );
}
export default ChatInfo