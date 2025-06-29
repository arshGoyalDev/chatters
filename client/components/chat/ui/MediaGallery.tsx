import { useLightbox } from "@/context";
import { HOST } from "@/utils/constants";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MediaGallery = () => {
  const { media, activeIndex, setActiveIndex } = useLightbox();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView();
    }
  }, [activeIndex]);

  return (
    <div className="w-full p-4">
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800"
      >
        {media?.map((item, index) => (
          <div
            key={index}
            ref={index === activeIndex ? scrollContainerRef : null}
            id={`thumbnail-${index}`}
            onClick={() => {
              setActiveIndex(index);
            }}
            className={`w-16 h-16 flex-shrink-0 relative rounded-lg overflow-hidden border-2 transition-all ${
              activeIndex === index ? "border-primary" : "border-zinc-800"
            }`}
          >
            {item.type === "image" ? (
              <div className="relative w-16 aspect-square rounded-md overflow-hidden">
                <Image
                  src={`${HOST}/${item.url}`}
                  fill
                  sizes="100%"
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full h-full rounded-lg">
                <video
                  src={`${HOST}/${item.url}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 bg-zinc-950/90 rounded-md">
                  <span className="stroke-white">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
