const { mkdirSync, existsSync } = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const platform = process.platform;
const arch = process.arch;

const TARGET_TRIPLES = {
  "win32-x64": "x86_64-pc-windows-msvc",
  "win32-arm64": "aarch64-pc-windows-msvc",
  "darwin-x64": "x86_64-apple-darwin",
  "darwin-arm64": "aarch64-apple-darwin",
  "linux-x64": "x86_64-unknown-linux-gnu",
  "linux-arm64": "aarch64-unknown-linux-gnu",
};

const key = `${platform}-${arch}`;
const triple = TARGET_TRIPLES[key] || process.env.TAURI_ENV_TARGET_TRIPLE;
if (!triple) {
  console.error(
    `Unknown platform/arch: ${platform}/${arch}. Set TAURI_ENV_TARGET_TRIPLE or add to TARGET_TRIPLES in scripts/build-api-binary.cjs`
  );
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const binariesDir = path.join(root, "src-tauri", "binaries");
const outfile = path.join(binariesDir, `api-${triple}`);

if (!existsSync(binariesDir)) {
  mkdirSync(binariesDir, { recursive: true });
}

const cmd = `bun build "${path.join(root, "src", "api", "main.ts")}" --compile --outfile "${outfile}"`;
execSync(cmd, { stdio: "inherit", cwd: root });
console.log("API binary built at", outfile);
