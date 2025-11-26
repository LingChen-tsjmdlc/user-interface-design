"use client";

import { TopBar } from "./bar/TopBar";
import { cn } from "@/lib/utils";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex h-screen w-screen")}>
      <TopBar />
      <main className="w-screen">{children}</main>
    </div>
  );
}
