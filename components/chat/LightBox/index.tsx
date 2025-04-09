"use client";

import { useLightbox } from "@/context";

const LightBox = () => {
  const { path, fileMessages, setPath } = useLightbox();

  return (
    path && (
      <main className="absolute z-50 top-0 left-0 w-full h-full bg-zinc--950/5 flex items-center justify-center rounded-lg">
        <div
          onClick={() => setPath(null)}
          className="absolute top-0 left-0 w-full h-full"
        ></div>
        <div className="w-[95%] z-[60] h-[90%] bg-zinc-950 border-2 border-zinc-900 rounded-lg">
          <div className="flex justify-between items-center py-3 pl-6 pr-4 border-b-2 border-zinc-900">
            <h2 className="capitalize font-medium tracking-wide">
              {path.split("/").at(-1)?.split(".")[0]}
            </h2>
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
          </div>
          <div>
            <div>
              
            </div>
          </div>
        </div>
      </main>
    )
  );
};
export default LightBox;
