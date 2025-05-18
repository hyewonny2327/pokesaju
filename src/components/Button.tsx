"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Button({
  children,
  background,
  onClick,
  routerPath,
}: {
  children: ReactNode;
  background: string;
  onClick?: () => void;
  routerPath?: string;
}) {
  const router = useRouter();
  function handleButtonClick() {
    if (onClick) {
      onClick();
    }
    routerPath && router.push(routerPath);
  }
  return (
    <button
      onClick={handleButtonClick}
      className={`px-4 py-2 bg-${background} text-black text-sm font-bold rounded-full border-2 border-black shadow-[2px_2px_0px_black] hover:bg-gray-100`}
    >
      {children}
    </button>
  );
}
