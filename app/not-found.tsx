"use client";

import { useTheme } from "next-themes";
import { Button, Card } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import FullScreenOverlay from "@/components/FullScreenOverlay";
import Magnet from "@/components/reactbitsUI/Magnet";
import FuzzyText from "@/components/reactbitsUI/FuzzyText";
import FallingText from "@/components/reactbitsUI/FallingText";

export default function NotFoundPage() {
  const { theme } = useTheme();

  return (
    <FullScreenOverlay>
      {/* 全屏背景文字 */}
      <div className="absolute inset-0 z-0 pt-10">
        <FallingText
          backgroundColor="transparent"
          fontSize="clamp(0.8rem, 5vw, 3rem)"
          gravity={0.56}
          highlightWords={["404"]}
          mouseConstraintStiffness={0.9}
          text={`404 Not Found 404 未找到 页面 `.repeat(10)}
          trigger="auto"
          wireframes={false}
        />
      </div>

      {/* 主内容卡片 */}
      <motion.div className="w-full max-w-xl relative z-10">
        <Magnet disabled={false} magnetStrength={5} padding={500}>
          <Card className="p-8 shadow-lg rounded-3xl overflow-hidden bg-white dark:bg-neutral-800">
            {/* 顶部装饰条 */}
            <motion.div
              animate={{ scaleX: 1 }}
              className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sophon-400 to-purple-400 dark:from-sophon-500 dark:to-purple-600"
              initial={{ scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />

            <div className="text-center">
              {/* 404图标 */}
              <motion.div
                animate={{ scale: 1, rotate: 0 }}
                className="mb-8"
                initial={{ scale: 0.8, rotate: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <svg
                  className="size-24 mx-auto text-sophon-400 dark:text-sophon-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </motion.div>

              {/* 标题 */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gray-800 dark:text-white mb-4"
                initial={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-block pr-7">
                  <FuzzyText
                    baseIntensity={0.3}
                    color={theme === "dark" ? "#ffffff" : "#374151"}
                    enableHover={true}
                    hoverIntensity={0.5}
                  >
                    404
                  </FuzzyText>
                </div>
              </motion.div>

              {/* 副标题 */}
              <motion.h2
                animate={{ opacity: 1 }}
                className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                页面未找到
              </motion.h2>

              {/* 描述文本 */}
              <motion.p
                animate={{ opacity: 1 }}
                className="text-gray-500 dark:text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                抱歉，您访问的页面可能不存在、已被移除、更名或暂时不可用
              </motion.p>

              {/* 返回首页按钮 */}
              <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} transition={{ delay: 0.6 }}>
                <Link href="/" passHref>
                  <Button className="font-medium" color="primary" size="lg" variant="shadow">
                    返回首页
                  </Button>
                </Link>
              </motion.div>

              {/* 额外帮助链接 */}
              <motion.div
                animate={{ opacity: 1 }}
                className="mt-6 flex justify-center space-x-4"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link href="email:3024705530@qq.com" passHref>
                  <Button className="text-blue-600 dark:text-blue-400" size="sm" variant="light">
                    联系支持: 3024705530@qq.com
                  </Button>
                </Link>
              </motion.div>
            </div>
          </Card>
        </Magnet>
      </motion.div>
    </FullScreenOverlay>
  );
}
