"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function FullScreenOverlay({ children }: { children: React.ReactNode }) {
  // 锁定页面滚动
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* 半透明遮罩层 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      />

      {/* 内容容器 */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {children}
      </motion.div>
    </>
  );
}
