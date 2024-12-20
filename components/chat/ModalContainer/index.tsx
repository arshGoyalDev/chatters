"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { NewChatModal } from "./modals";

const ModalContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const chatModal = searchParams.get("new-chat");

  return (
    <>
      {chatModal ? (
        <div className="z-[2000] fixed top-0 left-0 flex justify-center items-end md:items-center w-full h-full bg-black bg-opacity-50">
          <div
            onClick={() => {
              router.push("/chat");
            }}
            className="fix z-40 fixed top-0 left-0 w-full h-full"
          ></div>

          <div className="z-40">
            {chatModal && <NewChatModal />}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalContainer;
