"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { ToastProvider } from "@heroui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <HeroUIProvider>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </HeroUIProvider>
    );
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <HeroUIProvider>
        <ToastProvider placement="bottom-left" />
        <main>{children}</main>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
