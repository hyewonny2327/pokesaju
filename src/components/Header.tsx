import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 fixed top-0 left-0 z-50">
      <div className="flex gap-2">{children}</div>
    </header>
  );
}
