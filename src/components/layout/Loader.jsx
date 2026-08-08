"use client";

export default function Loader({
  size = "md",
  text = "",
}) {
  const dotSize = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">

      <div className="flex gap-2">

        <span
          className={`${dotSize[size]} rounded-full bg-blue-600 animate-bounce`}
        />

        <span
          className={`${dotSize[size]} rounded-full bg-blue-600 animate-bounce [animation-delay:0.15s]`}
        />

        <span
          className={`${dotSize[size]} rounded-full bg-blue-600 animate-bounce [animation-delay:0.3s]`}
        />

      </div>

      {text && (
        <p className="text-gray-500 text-sm">
          {text}
        </p>
      )}

    </div>
  );
}