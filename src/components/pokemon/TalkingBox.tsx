"use client";
import { ReactNode, useState } from "react";

interface TalkingBoxProps {
  ment: string[];
  children: ReactNode;
}
function TalkingBox({ ment, children }: TalkingBoxProps) {
  const [mentIndex, setMentIndex] = useState(0);
  function handleClickNext() {
    if (mentIndex >= ment.length - 1) {
      return;
    }
    setMentIndex((prev) => prev + 1);
  }
  return (
    <div className="relative w-full max-w-3xl rounded-xl border-4 border-black bg-slate-50 p-8 shadow-[10px_10px_0px_0px_black] space-y-6">
      <div className="flex items-center">
        <img
          src="/drO.svg"
          alt="Professor"
          className="w-[90px] h-auto object-contain mr-4 shrink-0"
        />
        <div className="flex-1 text-center space-y-2 font-mono text-sm tracking-wide text-gray-700">
          <p className="text-xl whitespace-pre-line text-center">
            {ment[mentIndex]}
          </p>
        </div>
        {mentIndex < ment.length - 1 && (
          <button
            onClick={handleClickNext}
            className="ml-4 px-6 py-2 bg-red-500 text-white text-sm font-bold rounded-full border-2 border-black shadow-[2px_2px_0px_black] hover:bg-red-600 transition-all duration-200"
          >
            Next
          </button>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
}

export default TalkingBox;
