import { useState } from "react";

import { ModalHeader, SelectMultiContact } from "./";

import { UserInfo } from "@/utils/types";

import { useSocket } from "@/context";

import useAppStore from "@/store";

import { useRouter } from "next/navigation";

const AddMemberModal = () => {
  const socket = useSocket();
  const router = useRouter();

  const { chatData } = useAppStore();

  const [selectedMembers, setSelectedMembers] = useState<UserInfo[] | null>(
    null
  );

  const addMembers = () => {
    if (selectedMembers?.length !== 0) {
      socket?.socket?.emit("event:chat:add", {
        chatId: chatData?._id,
        newMembers: selectedMembers,
      });

      router.push("/chat");
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] flex flex-col max-w-[500px] h-[440px] lg:h-[440px] rounded-xl bg-zinc-950 border-2 border-zinc-800 shadow-2xl">
      <ModalHeader title="Add Member/s" />
      <div className="flex flex-col h-full overflow-auto pb-4">
        <SelectMultiContact
          addMember={true}
          selectedContacts={selectedMembers}
          setSelectedContacts={setSelectedMembers}
        />
      </div>

      <div className="flex justify-end border-t-2 border-zinc-900 px-4 py-4">
        <button
          onClick={addMembers}
          className="px-4 py-1.5 text-black bg-primary rounded-md font-semibold"
        >
          Add Member/s
        </button>
      </div>
    </div>
  );
};

export default AddMemberModal;
