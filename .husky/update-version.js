const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const oldVersion = pkg.version.trim();
const parts = oldVersion.split(".").map(Number);
parts[2]++; // 修订号 +1
const newVersion = parts.join(".");

if (oldVersion === newVersion) {
  process.exit(0);
}

pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

console.log(`📦 版本更新: ${oldVersion} → ${newVersion}`);
execSync("git add package.json"); // 自动加入暂存区

// ✅ 不退出，不阻止提交
