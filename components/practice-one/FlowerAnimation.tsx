/* eslint-disable react/no-unknown-property */
"use client";

import React, { useState, useEffect } from "react";
import CountUp from "../reactbitsUI/CountUp";
import GradientText from "../reactbitsUI/GradientText";

interface FlowerData {
  pic1: string;
  pic2: string;
}

const FlowerAnimation = () => {
  const [flowerData, setFlowerData] = useState<FlowerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 从 JSON 文件加载花瓣数据
  useEffect(() => {
    const loadFlowerData = async () => {
      try {
        const response = await fetch("/base64/flower.json");
        if (!response.ok) {
          throw new Error("Failed to load flower data");
        }
        const data: FlowerData = await response.json();
        setFlowerData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        console.error("Error loading flower data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFlowerData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

  if (error || !flowerData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">加载失败: {error || "数据为空"}</div>
      </div>
    );
  }

  // 使用从 JSON 文件读取的数据
  const clockwiseFlowerBase64 = flowerData.pic1;
  const counterclockwiseFlowerBase64 = flowerData.pic2;

  return (
    <div className="relative min-h-[80vh] max-w-[35vw] bg-gray-50 dark:bg-neutral-950/30 text-gray-900 dark:text-gray-100 font-sans antialiased rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 mt-10">
      {/* 主容器 - 添加 relative 定位和 padding-bottom 为导航栏留出空间 */}
      <div className="container mx-auto px-4 pt-8 pb-20 min-h-[80vh] max-w-[35vw] flex flex-col">
        {/* 主要内容区域 */}
        <main className="flex-grow flex flex-col items-center justify-center space-y-6">
          {/* 花瓣动画容器 */}
          <div
            className="relative flex items-center justify-center backface-visibility-hidden"
            style={{
              width: "min(68vmin, 420px)",
              height: "min(68vmin, 420px)",
            }}
            aria-hidden="true"
            role="img"
            aria-label="花瓣叠影"
          >
            {/* 顺时针旋转的花瓣 */}
            <img
              src={clockwiseFlowerBase64}
              alt="顺时针旋转花瓣"
              className="absolute w-full h-full object-contain animate-spin-slow"
            />

            {/* 逆时针旋转的花瓣 */}
            <img
              src={counterclockwiseFlowerBase64}
              alt="逆时针旋转花瓣"
              className="absolute w-full h-full object-contain animate-spin-slow-reverse"
            />

            {/* 中心数字 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[30%] h-[30%] rounded-full flex items-center justify-center text-white font-semibold text-6xl md:text-7xl text-shadow-lg">
                <CountUp from={0} to={68} separator="," direction="up" duration={1} className="count-up-text" />
              </div>
            </div>
          </div>

          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="text-2xl md:text-4xl font-bold"
          >
            Ride Time
          </GradientText>

          {/* 信息卡片区域 */}
          <section className="w-full max-w-2xl grid grid-cols-3 gap-6 px-4 py-8" aria-label="detailed times">
            {/* 骑行时间卡片 */}
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto mb-2 text-gray-600 dark:text-gray-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 7v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Ride Time</span>
              <div className="text-lg font-semibold">10:48</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">MIN</div>
            </div>

            {/* 骑行时间卡片2 */}
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto mb-2 text-gray-600 dark:text-gray-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 12L18 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Ride Time</span>
              <div className="text-lg font-semibold">28</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">MIN</div>
            </div>

            {/* 骑行时间卡片3 */}
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto mb-2 text-gray-600 dark:text-gray-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path
                    d="M12 2c3.866 0 7 3.134 7 7 0 5-7 13-7 13s-7-8-7-13c0-3.866 3.134-7 7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9" r="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Ride Time</span>
              <div className="text-lg font-semibold">28</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">MIN</div>
            </div>
          </section>
        </main>

        {/* 底部导航栏 - 使用 absolute 定位并相对于主容器 */}
        <nav className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b rounded-2xl from-purple-600/98 to-purple-700 shadow-lg rounded-t-xl flex items-center justify-center">
          <div className="flex flex-col gap-1.5 transform translate-y-0.5" aria-hidden="true">
            <svg className="w-7 h-3.5 stroke-white stroke-[3] opacity-95" viewBox="0 0 24 12" fill="none">
              <path d="M2 2.5L12 10L22 2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="w-7 h-3.5 stroke-white stroke-[3] opacity-95" viewBox="0 0 24 12" fill="none">
              <path d="M2 2.5L12 10L22 2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </nav>
      </div>

      {/* 自定义动画样式 */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }

        .backface-visibility-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .text-shadow-lg {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </div>
  );
};

export default FlowerAnimation;
