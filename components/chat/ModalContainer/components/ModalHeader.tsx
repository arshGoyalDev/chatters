import Link from "next/link";

const ModalHeader = ({ title }: { title: string }) => {
  return (
    <div className="w-full rounded-t-xl md:rounded-xl">
      <div className="flex justify-between items-center py-5 md:py-4 px-4 md:px-6">
        <h2 className="font-semibold text-xl">{title}</h2>
        <Link href="/chat">
          <div className="stroke-white rotate-45">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12H18"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ModalHeader;
