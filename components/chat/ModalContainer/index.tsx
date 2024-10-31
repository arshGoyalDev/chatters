"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { NewChatModal } from "./modals"

const ModalContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const chatModal = searchParams.get("new-chat")

  return (
    <>
      {chatModal ? (
        <div onClick={() => router.push("/chat")} className="z-50 fixed top-0 left-0 flex justify-center items-end md:items-center w-full h-full bg-black bg-opacity-50">
          {chatModal && <NewChatModal />}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ModalContainer