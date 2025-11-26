"use client";
import FlowerAnimation from "@/components/practice-one/FlowerAnimation";

export default function PricingPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <FlowerAnimation />
      </div>
      <div className="w-full my-10">
        <iframe
          src="https://mcnwy0h1ynny.feishu.cn/docx/TYyIdMz7eopnkFxhzeScHIOpnzf?from=from_copylink" // ← 你要嵌入的链接，请替换为实际链接
          title="嵌入页面"
          width="100%"
          height="600px" // 可根据需求调整高度
          className="border rounded-lg shadow-lg"
        />
      </div>
    </>
  );
}
