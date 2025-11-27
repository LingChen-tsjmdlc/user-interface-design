// components/LocalIcon.tsx
"use client";

import { ComponentProps, forwardRef, useState, useEffect } from "react";

interface LocalIconProps extends Omit<ComponentProps<"div">, "children"> {
  /**
   * 图标名称（对应 public/icons 目录下的文件名，不需要 .svg 后缀）
   * @example "file" 对应 public/icons/file.svg
   */
  name: string;

  /**
   * 图标尺寸，可以是数字（像素）或字符串（如 "1rem"）
   * @default 24
   */
  size?: number | string;

  /**
   * 如果 autoFill 为真，自动替换所有 fill 属性为 currentColor
   * @default true
   */
  autoFill?: boolean;

  /**
   * 如果为 true，不处理 SVG 内容，直接以 img 标签原样渲染原始 SVG 文件
   * @default false
   */
  isRaw?: boolean;
}

const LocalIcon = forwardRef<HTMLDivElement, LocalIconProps>(
  ({ name, size = 24, className = "", autoFill = true, isRaw = false, style, ...props }, ref) => {
    const [svgContent, setSvgContent] = useState<string>("");

    useEffect(() => {
      if (!isRaw) {
        fetch(`/icons/${name}.svg`)
          .then((res) => res.text())
          .then((text) => {
            if (autoFill) {
              const processed = text.replace(/fill="[^"]*"/g, 'fill="currentColor"');
              setSvgContent(processed);
            } else {
              setSvgContent(text);
            }
          })
          .catch((err) => {
            console.error(`Failed to load icon "${name}":`, err);
            setSvgContent("");
          });
      }
    }, [name, isRaw, autoFill]);

    // ✅ isRaw === true：直接以 img 标签渲染原始 SVG 文件，不处理、不注入
    if (isRaw) {
      // 修复：使用字符串拼接避免 ESLint 模板字符串解析错误
      const imageUrl = "/icons/" + name + ".svg";

      return (
        <img
          ref={ref as any}
          src={imageUrl}
          alt={name}
          className={className}
          style={{
            width: size,
            height: size,
            ...style,
          }}
          {...props}
        />
      );
    }

    // ✅ isRaw === false（默认）：正常加载 SVG，可选择替换 fill，用 dangerouslySetInnerHTML 渲染为 inline 图标
    const finalStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      ...(typeof size === "number" ? { width: size, height: size } : { width: size, height: size }),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={`inline-flex ${className}`}
        style={finalStyle}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        {...props}
      />
    );
  },
);

LocalIcon.displayName = "LocalIcon";

export default LocalIcon;
