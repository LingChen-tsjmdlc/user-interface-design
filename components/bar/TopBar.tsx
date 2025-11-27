"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import clsx from "clsx";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ThemeSwitch } from "@/components/bar/theme-switch";
import { Button } from "@heroui/button";
import { Link as HeroLink } from "@heroui/react";

export const TopBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  // 修改为练习导航项
  const navItems = [
    { name: "练习1", link: "/practice1", icon: "mdi:numeric-1-circle" },
    { name: "练习2", link: "/practice2", icon: "mdi:numeric-2-circle" },
    { name: "练习3", link: "/practice3", icon: "mdi:numeric-3-circle" },
    { name: "练习4", link: "/practice4", icon: "mdi:numeric-4-circle" },
    { name: "练习5", link: "/practice5", icon: "mdi:numeric-5-circle" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.1);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      layout
      className={clsx(
        "fixed top-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-lg z-[50]",
        isScrolled ? "w-[85%] md:w-[90%] mt-6 rounded-3xl" : "w-full rounded-none",
        // 修改为蓝色主题
        resolvedTheme === "dark"
          ? "bg-blue-900/20 border border-blue-500/40 shadow-none"
          : clsx(
              "bg-blue-50/80 border border-blue-300/40 shadow-[0_0_10px_2px_rgba(59,130,246,0.15)]",
              isScrolled && "shadow-[0_0_15px_2px_rgba(59,130,246,0.25)]",
            ),
      )}
    >
      <div className="flex items-center justify-between px-2 sm:px-4 md:px-10 py-3 md:py-4">
        {/* Logo - 修改为蓝色主题 */}
        <Link
          href="/"
          className="text-base sm:text-lg md:text-xl font-bold text-blue-600 dark:text-blue-300 whitespace-nowrap"
        >
          界面设计实训
        </Link>

        {/* 桌面导航按钮 */}
        <div
          className="hidden md:flex items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-sm font-medium"
          onMouseLeave={() => setHovered(null)}
        >
          {navItems.map((item, idx) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={idx}
                href={item.link}
                className="relative px-3 sm:px-3 md:px-4 py-2 rounded-full bg-sky-200/20 dark:bg-sky-950/20"
              >
                {/* 涟漪背景动画 */}
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered-bg"
                    className="absolute inset-0 rounded-full bg-blue-300/60 dark:bg-blue-700/40"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <motion.button
                  onMouseEnter={() => setHovered(idx)}
                  className={clsx(
                    "relative z-10 transition-colors duration-300 rounded-full flex items-center gap-2",
                    isActive
                      ? "text-blue-700 dark:text-blue-300 font-semibold after:block after:h-[2px] after:bg-blue-700 dark:after:bg-blue-300 after:rounded-full after:mt-1"
                      : "text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300",
                  )}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {/* 添加数字图标 */}
                  <Icon
                    icon={item.icon}
                    className={clsx(
                      "text-xl",
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-blue-500/80 dark:text-blue-400/80",
                    )}
                  />
                  {item.name}
                </motion.button>
              </Link>
            );
          })}
        </div>

        {/* 右侧功能 */}
        <div className="flex items-center gap-1 sm:gap-2">
          <HeroLink isExternal href="https://github.com/LingChen-tsjmdlc/user-interface-design">
            <Button className="mr-2" color="secondary" variant="shadow">
              <Icon icon={"line-md:github-twotone"} className="text-large" />
              源代码
            </Button>
          </HeroLink>
          <ThemeSwitch />
        </div>
      </div>
    </motion.nav>
  );
};
