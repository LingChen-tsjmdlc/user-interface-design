import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    ".now/*",
    "**/*.css",
    "**/.changeset",
    "**/dist",
    "esm/*",
    "public/*",
    "tests/*",
    "scripts/*",
    "**/*.config.js",
    "**/.DS_Store",
    "**/node_modules",
    "**/coverage",
    "**/.next",
    "**/build",
    "!**/.commitlintrc.cjs",
    "!**/.lintstagedrc.cjs",
    "!**/jest.config.js",
    "!**/plopfile.js",
    "!**/react-shim.js",
    "!**/tsup.config.ts",
  ]),
  {
    // 忽略 http 封装
    ignores: ["lib/http.ts"],
  },
  {
    extends: fixupConfigRules(
      compat.extends(
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@next/next/recommended",
        "next/core-web-vitals",
      ),
    ),

    plugins: {
      react: fixupPluginRules(react),
      "unused-imports": unusedImports,
      import: fixupPluginRules(_import),
      "@typescript-eslint": typescriptEslint,
      "jsx-a11y": fixupPluginRules(jsxA11Y),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key]) => [key, "off"]),
        ),
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: path.join(__dirname, "tsconfig.json"),
        },
        alias: {
          map: [
            ["@", "./"], // Next.js 项目根目录
            ["@/components", "./components"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    files: ["**/*.ts", "**/*.tsx"],

    rules: {
      // React 中禁止未知属性（比如拼错的属性），但这里允许 "intensity"、"position"（常用于 three.js / 3D 场景）
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["intensity", "position"],
        },
      ],

      // 允许使用 console（默认是警告/错误）
      "no-console": "off",

      // 不强制写 propTypes
      "react/prop-types": "off",

      // 不需要显式使用 React 变量就写 JSX（React 17+ 已经不需要 import React）
      "react/jsx-uses-react": "off",

      // 同上，不强制在作用域里有 React
      "react/react-in-jsx-scope": "off",

      // 关闭 React hooks 的依赖项检查（比如 useEffect 里 ESLint 不会强制要求依赖数组补全）
      "react-hooks/exhaustive-deps": "off",

      // 无障碍（a11y）规则：关闭 "click" 事件必须配合键盘事件
      "jsx-a11y/click-events-have-key-events": "off",

      // 无障碍：关闭交互元素必须支持 focus
      "jsx-a11y/interactive-supports-focus": "off",

      // 无障碍：关闭禁止给非交互元素绑定事件
      "jsx-a11y/no-static-element-interactions": "off",

      // 无障碍：关闭 iframe 必须有 title 属性
      "jsx-a11y/iframe-has-title": "off",

      // 无障碍：关闭 <video>/<audio> 必须有字幕
      "jsx-a11y/media-has-caption": "off",

      // 无障碍：关闭禁止在 alt 属性里写 "image/picture/photo"
      "jsx-a11y/img-redundant-alt": "off",

      // Next.js 规则：允许使用 <img> 标签（否则强制用 next/image）
      "@next/next/no-img-element": "off",

      // Prettier 插件：格式化代码
      "prettier/prettier": ["error", {
        "printWidth": 120,
        "tabWidth": 2,
        "semi": true,
        "singleQuote": false,
        "trailingComma": "all",
        "bracketSpacing": true,
        "arrowParens": "always",
        "endOfLine": "auto",
        "jsxSingleQuote": false,
        "jsxBracketSameLine": false,
        "proseWrap": "always",
        "bracketSameLine": false
      }],


      // 关闭原生 no-unused-vars（用 TypeScript 版本代替）
      "no-unused-vars": "off",

      // TypeScript 版本的 unused-vars：严格检查未使用的变量
      // 这里配置了：允许 _xxx 开头的变量或参数不报错
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",              // 检查所有变量
          args: "after-used",       // 只报错最后未使用的参数
          ignoreRestSiblings: true, // 解构剩余属性可以忽略
          varsIgnorePattern: "^_",  // 忽略变量名以 _ 开头
          argsIgnorePattern: "^_",  // 忽略参数名以 _ 开头
        },
      ],

      // 检查并自动删除未使用的 import
      "unused-imports/no-unused-imports": "error",

      // 关闭 import 排序要求（否则必须分组/排序 import）
      /** 正确排序如下
       * builtin → Node.js 内置 (fs, path, …)
       * external → 第三方依赖 (react, next, dhtmlx-gantt, @heroui/react, …)
       * internal → 你项目内的 (@/...)
       * parent → 上级目录 (../...)
       * sibling/index → 当前目录 (./...)
       */
      "import/order": "off",

      // 非空标签不强制自闭合（比如 <div></div> 应该是 <div />）
      "react/self-closing-comp": "error",

      // 关闭强制 props 按字母顺序排序
      "react/jsx-sort-props": "off",

      // 关闭语句之间必须有空行（比如变量声明和 return 之间）
      "padding-line-between-statements": "error",

      // 重复写了一次，效果和上面一样：允许用 <img>
      "@next/next/no-img-element": "off",

      // 强制使用全等 === 和 !==，避免类型隐式转换
      "eqeqeq": "error",

      // 强制 if/for/while 等语句使用花括号，避免逻辑错误
      "curly": "error",

      // 禁止重复 import
      "no-duplicate-imports": "error",

      // 能用 const 就用 const，提升代码可读性和安全性
      "prefer-const": "off",

      "jsx-a11y/no-noninteractive-element-interactions": "off",

      "react/no-unknown-property": "error"
    },
  },
]);
