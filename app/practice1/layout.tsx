"use client";

import React, { useEffect, useState } from "react";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [maxWidth, setMaxWidth] = useState("max-w-3xl");

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMaxWidth("max-w-xl");
      } // 手机
      else if (width < 1024) {
        setMaxWidth("max-w-4xl");
      } // 平板
      else if (width < 1440) {
        setMaxWidth("max-w-6xl");
      } // 普通桌面
      else {
        setMaxWidth("max-w-7xl");
      } // 超宽屏
    };

    updateWidth(); // 初始化
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="flex flex-col items-center w-screen mt-20 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <main className={`w-full ${maxWidth} flex flex-col gap-6`} style={{ overflowX: "hidden" }}>
        {children}
      </main>
    </div>
  );
}
