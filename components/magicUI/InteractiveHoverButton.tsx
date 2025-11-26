import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group bg-white dark:bg-black relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold",
        // 仅添加的紫色自发光效果
        "shadow-[0_0_8px_0_rgba(168,85,247,0.3)] dark:shadow-[0_0_12px_0_rgba(168,85,247,0.5)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-black dark:text-white">
          {children}
        </span>
      </div>
      <div className="text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
}
