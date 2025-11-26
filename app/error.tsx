"use client";

import { Button } from "@heroui/react";
import { useEffect } from "react";
import FullScreenOverlay from "@/components/FullScreenOverlay";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <FullScreenOverlay>
      <div className=" flex flex-col items-center justify-center p-6 min-h-[90vh] z-50">
        <div className="w-full max-w-md rounded-xl shadow-lg dark:shadow-white/10 p-8 space-y-6 transition-colors duration-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <svg
                className="h-10 w-10 text-red-500 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">哦! 发生了一些未知的错误。</h1>
            <p className="text-gray-600 dark:text-gray-300 text-center">如果问题仍然存在，请重试或联系支持人员。</p>

            <div className="pt-4 w-full">
              <Button
                className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-colors"
                onPress={reset}
              >
                刷新一下页面
              </Button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <span>报错细节:</span>
                <svg
                  className="h-5 w-5 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </summary>
              <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-auto">
                <code className="text-sm text-red-600 dark:text-red-400">{error.message}</code>
              </div>
            </details>
          </div>
        </div>

        <div className="flex items-center justify-center mt-8 gap-x-2 text-center text-sm text-gray-500 dark:text-gray-400">
          需要帮助?
          <a
            href="mail:3024705530@qq.com"
            className="inline-flex items-center gap-1 text-red-500 hover:underline dark:text-red-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
            联系邮箱: 3024705530@qq.com
          </a>
        </div>
      </div>
    </FullScreenOverlay>
  );
}
