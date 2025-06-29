import { HOST } from "@/utils/constants";

const VideoPlayer = ({ url, locally = false }: { url: string, locally?: boolean }) => {
  return (
    <div className="relative h-full">
      <video
        src={locally ? url : `${HOST}/${url}`}
        className="rounded-lg h-full object-cover"
      />
      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 bg-zinc-950/90 rounded-md">
        <span className="stroke-white">
          <svg
            width="24"
            height="24"
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
      </button>
    </div>
  );
};
export default VideoPlayer;
