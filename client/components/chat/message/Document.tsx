const Document = ({
  filePath,
  filename,
}: {
  filename: string;
  filePath: string;
}) => {
  return (
    <div className="flex items-center gap-2 w-full overflow-hidden md:gap-4 bg-zinc-950 py-2 px-2 md:px-4 md:py-4 rounded-lg">
      <div className="bg-zinc-900 p-2 rounded-lg">
        <span className="stroke-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 13H13"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 17H11"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <p className="font-semibold">
        <span className="sm:hidden">
          {filename.length > 10 ? filename.substring(0, 10) + "..." : filename}
        </span>
        <span className="hidden sm:inline">
          {filename.length > 30 ? filename.substring(0, 30) + "..." : filename}
        </span>
      </p>
    </div>
  );
};
export default Document;
