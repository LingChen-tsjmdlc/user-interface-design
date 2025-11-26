"use client";

import { motion } from "motion/react";
import { AuroraBackground } from "@/components/aceternity-ui/aurora-background";
import { TextAnimate } from "@/components/magicUI/TextAnimate";

export default function Home() {
  return (
    <div>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative flex flex-col gap-6 items-center justify-center px-4 text-center"
        >
          {/* 主标题 - 交错动画 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent"
          />
          <TextAnimate
            delay={0.3}
            duration={0.3}
            className="text-4xl md:text-8xl font-bold text-slate-900 dark:text-slate-100"
            animation="blurInUp"
            by="character"
            once
          >
            用户界面设计
          </TextAnimate>

          {/* 副标题 - 缩放动画 */}
          <TextAnimate
            delay={0.6}
            className="text-2xl md:text-5xl font-semibold dark:text-slate-200 text-slate-800"
            animation="scaleUp"
          >
            创新交互体验
          </TextAnimate>

          {/* 描述文字 - 打字机效果 */}
          <TextAnimate
            delay={1}
            duration={0.4}
            animation="slideLeft"
            by="character"
            className="text-base sm:text-lg md:text-2xl font-light dark:text-neutral-200 text-gray-600 max-w-4xl leading-relaxed"
          >
            探索现代 Web 设计的无限可能，打造流畅的用户体验
          </TextAnimate>

          {/* 特性列表 - 列表动画 */}
          <motion.div
            className="flex flex-wrap gap-4 md:gap-8 justify-center mt-6"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {["响应式设计", "交互动效", "现代美学", "用户体验"].map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="px-4 py-2 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <span className="text-sm md:text-base font-medium dark:text-white text-gray-700">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
