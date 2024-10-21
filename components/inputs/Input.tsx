import { Dispatch, SetStateAction } from "react";

const Input = ({
  value,
  setValue,
  error,
  type,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error?: string;
  type: string;
}) => {
  return (
    <div className="w-full">
      <input
        type="text"
        name={type}
        id={type}
        value={value}
        autoComplete="off"
        autoFocus={true}
        onChange={(e) => setValue(e.target.value)}
        placeholder={type[0].toUpperCase() + type.slice(1)}
        className={` w-full py-3 px-5 bg-zinc-900 border-2 rounded-lg placeholder:text-zinc-600 ${
          error
            ? "border-red-500"
            : "w-full border-zinc-700"
        }`}
      />
      {error !== "" && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default Input;
