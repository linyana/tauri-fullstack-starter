## Dev Agent 桌面应用

> Looking for the English version? See [`README.en.md`](README.en.md).

一个为「开发者工具 / AI Dev Agent」场景量身打造的 **本地桌面全栈模板**：

![tauri-starter](https://raw.githubusercontent.com/linyana/tauri-fullstack-starter/refs/heads/main/public/me.jpg)

- **桌面端**：Tauri 2（Rust）
- **前端**：React 19 + Vite 8 + TypeScript 5 + Ant Design
- **后端**：Elysia（Bun/Node）HTTP API
- **数据层**：Prisma 7 + 数据库（可自行选择）
- **一键启动**：打包后的 exe 自动同时启动前后端，真正的「本地一体化 Dev Agent」

---

## ✨ 特性亮点

- **本地优先，安全可控**
  - 前端、后端、数据库全部跑在本机，适合对隐私/代码安全要求高的 Dev Agent 场景。
- **一键双击即用**
  - 打包后的 Tauri 应用内置后端 sidecar，启动桌面应用时自动拉起 API 服务，无需额外装 Node/Bun。
- **现代前端技术栈**
  - React 19 + Vite 8 + TS 5，内置 Ant Design、Zustand、React Router，随时扩展复杂界面。
- **轻量高性能后端**
  - 基于 Elysia 的 HTTP API，接口定义简洁、类型安全，可方便对接 LLM、Git、GitHub 等能力。
- **数据库就绪**
  - 集成 Prisma，直接基于 `schema.prisma` 设计你的 Agent 配置、会话记录、任务流水线等数据结构。

---

## 🚀 快速开始

### 环境要求

- Node.js 或 Bun（推荐 Bun，用于构建后端 sidecar）
- Rust 开发环境（Tauri 要求）
- 包管理工具：`bun`（你也可以换成 npm/pnpm/yarn，但 README 以 Bun 为例）

### 安装依赖

```bash
bun install
```

### 设置 Prisma

```bash
# 应用数据库迁移
bun run prisma:push

# 生成 Prisma 客户端
bun run prisma:generate
```

### 构建后端二进制文件

```bash
bun run build:api-binary
```


### 开发模式（前后端一起跑）

```bash
# 同时启动前端 + 后端
bun run dev
```

- 前端（Vite）：`http://localhost:5173`
- 后端（Elysia）：`http://localhost:48327`

React 示例页面会调用：

```ts
POST http://localhost:48327/greet
```

你可以在 `src/app/App.tsx` 和 `src/api/main.ts` 里快速试验自己的接口与 UI。

### 桌面开发模式（Tauri Dev）

```bash
bun run tauri dev
```

这会打开一个 Tauri 窗口，加载本地开发的前端页面，方便调试桌面行为、窗口管理等。

---

## 🏗 架构一览

```text
tauri-starter
├─ src/app          # React 前端（Vite SPA）
│  ├─ main.tsx      # 前端入口
│  └─ App.tsx       # 示例界面：调用 /greet 接口
│
├─ src/api          # Elysia 后端 API
│  └─ main.ts       # 后端入口：提供 /greet 示例接口
│
├─ src-tauri        # Tauri 桌面端（Rust）
│  ├─ src/main.rs   # Tauri 入口
│  ├─ src/lib.rs    # 启动 sidecar 后端、窗口管理等逻辑
│  └─ tauri.conf.json
│
├─ prisma           # Prisma 数据模型
│  └─ schema.prisma
│
├─ public           # 静态资源
├─ package.json     # 脚本与依赖
└─ vite.config.ts   # Vite 配置
```

---

## 📦 打包 & 分发

项目已经配置好打包流程，打出来的 exe 会自动携带并启动后端。

### 一键打包

```bash
bun run tauri build
```

内部会依次做这些事：

1. **构建前端**

   ```bash
   bun run build        # tsc && vite build
   ```

2. **构建后端 sidecar 可执行文件**

   ```bash
   bun build src/api/main.ts --compile --outfile src-tauri/binaries/api
   ```

3. Tauri 将前端静态资源与 `binaries/api` 一起打进安装包/可执行文件。

### 运行效果

- 用户双击安装/运行应用时：
  - Tauri 启动桌面前端窗口
  - 同时通过 sidecar 自动拉起 `api` 后端进程（监听 `http://localhost:48327`）
- 前端请求依然走本机 HTTP 接口，体验与开发时一致。
- 关闭窗口时，后端 sidecar 进程会被安全退出，不会残留僵尸进程。

---

## 🧩 可以如何扩展这个模板？

- **接入 LLM / OpenAI / 本地模型**
  - 在 `src/api/main.ts` 中新增路由，封装调用大模型的逻辑。
- **构建 Dev Agent 工作流**
  - 用 `Prisma` 设计任务、会话、项目等数据表，让 Agent 具备「长期记忆」。
- **集成 Git / GitHub 自动化**
  - 使用已经安装的 `simple-git`、`@octokit/rest`，做自动提交、PR 创建、代码分析等。
- **丰富桌面能力**
  - 通过 Tauri 提供的 API 访问文件系统、系统通知、快捷键等，打造真正的「本地 Dev 助手」。

---

## 🛠 常用脚本一览

```jsonc
{
  "dev:app": "vite", // 仅前端开发
  "dev:api": "bun --watch src/api/main.ts", // 仅后端开发
  "dev": "concurrently \"bun run dev:app\" \"bun run dev:api\"",
  "build": "tsc && vite build", // 仅构建前端
  "build:tauri": "bun run build && bun build src/api/main.ts --compile --outfile src-tauri/binaries/api",
  "tauri": "tauri", // Tauri CLI 入口
  "db:push": "prisma db push", // 同步 Prisma 模型到数据库
}
```

---

## 📚 开发建议

- 推荐使用：
  - VS Code / Cursor
  - Tauri 官方插件
  - Rust Analyzer
- 推荐将后端 API 设计成「细粒度能力 + 高层任务编排」，方便与大模型的 Agent 思想结合。

---

如果你正在寻找一个 **既能本地运行、又能轻松扩展成 AI Dev Agent 的桌面应用模板**，这个项目就是为此而生。

> 想看英文版？请访问 [`README.en.md`](README.en.md)。
