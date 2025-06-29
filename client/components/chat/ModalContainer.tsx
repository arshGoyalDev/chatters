"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useEffect } from "react";

import useAppStore from "@/store";
import dynamic from "next/dynamic";

const AddMemberModal = dynamic(() => import("./ui/AddMemberModal"), { ssr: false });
const NewChatModal = dynamic(() => import("./ui/NewChatModal"), { ssr: false });
const NewGroupChatModal = dynamic(() => import("./ui/NewGroupChatModal"), { ssr: false });

const ModalContainerFunc = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { chatData } = useAppStore();

  const chatModal = searchParams.get("new-chat");
  const groupChatModal = searchParams.get("new-group-chat");
  const addMemberModal = searchParams.get("add-member");

  useEffect(() => {
    if (addMemberModal && chatData?.chatType !== "group") router.push("/chat");
  }, [chatData]);

  return (
    <>
      {chatModal || groupChatModal || addMemberModal ? (
        <div className="z-[2000] fixed top-0 left-0 flex justify-center items-end md:items-center w-full h-full bg-zinc-950 bg-opacity-30">
          <div
            onClick={() => {
              router.push("/chat");
            }}
            className="fix z-40 fixed top-0 left-0 w-full h-full"
          ></div>

          <div className="z-40">
            {chatModal && <NewChatModal />}
            {groupChatModal && <NewGroupChatModal />}
            {addMemberModal && <AddMemberModal />}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const ModalContainer = () => {
  return (
    <Suspense
      fallback={
        <div className="z-[2000] fixed top-0 left-0 w-full h-full grid place-content-center text-xl font-bold bg-black bg-opacity-50">
          Server Error
        </div>
      }
    >
      <ModalContainerFunc />
    </Suspense>
  );
};

export default ModalContainer;
