## Dev Agent Desktop App

A **local full‑stack desktop template** tailored for _developer tools / AI Dev Agent_ scenarios:

![tauri-starter](https://github.com/linyana/tauri-fullstack-starter/blob/main/public/me.png)

- **Desktop shell**: Tauri 2 (Rust)
- **Frontend**: React 19 + Vite 8 + TypeScript 5 + Ant Design
- **Backend**: Elysia (Bun/Node) HTTP API
- **Data layer**: Prisma 7 + your database of choice
- **All‑in‑one**: The packaged exe automatically starts both frontend and backend, giving you a truly self‑contained local Dev Agent.

> 🔁 Looking for the Chinese version? See [`README.md`](README.md).

---

## ✨ Highlights

- **Local‑first & privacy‑friendly**
  - Frontend, backend, and database all run on your machine, ideal for scenarios where code and data must stay local.
- **One double‑click to run**
  - The packaged Tauri app embeds the backend as a sidecar. Starting the desktop app automatically starts the API service—no need to install Node/Bun on the end user’s machine.
- **Modern frontend stack**
  - React 19 + Vite 8 + TS 5, with Ant Design, Zustand, and React Router pre‑installed so you can grow from a simple UI to a full console.
- **Lightweight, type‑safe backend**
  - Elysia provides a clean and type‑safe HTTP API layer, perfect for wiring up LLMs, Git, GitHub, and other Dev Agent capabilities.
- **Database‑ready**
  - Prisma is integrated; design your agent configs, sessions, task pipelines, etc. directly via `schema.prisma`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js or Bun (Bun recommended for building the backend sidecar)
- Rust toolchain (required by Tauri)
- Package manager: `bun` (you can switch to npm/pnpm/yarn, but examples use Bun)

### Install dependencies

```bash
bun install
```

### Set up Prisma

```bash
# Apply database migrations
bun run prisma:push

# Generate Prisma client
bun run prisma:generate
```

### Dev mode (frontend + backend)

```bash
# Start frontend + backend together
bun run dev
```

- Frontend (Vite): `http://localhost:5173`
- Backend (Elysia): `http://localhost:48327`

The React example page calls:

```ts
POST http://localhost:48327/greet
```

You can quickly iterate UI & APIs in `src/app/App.tsx` and `src/api/main.ts`.

### Desktop dev mode (Tauri Dev)

```bash
bun run tauri dev
```

This opens a Tauri window that loads your local dev frontend, convenient for testing desktop behavior and window management.

---

## 🏗 Architecture Overview

```text
tauri-starter
├─ src/app          # React frontend (Vite SPA)
│  ├─ main.tsx      # Frontend entry
│  └─ App.tsx       # Example UI: calls /greet
│
├─ src/api          # Elysia backend API
│  └─ main.ts       # Backend entry: /greet example endpoint
│
├─ src-tauri        # Tauri desktop (Rust)
│  ├─ src/main.rs   # Tauri entry
│  ├─ src/lib.rs    # Sidecar backend startup & window handling
│  └─ tauri.conf.json
│
├─ prisma           # Prisma data models
│  └─ schema.prisma
│
├─ public           # Static assets
├─ package.json     # Scripts & dependencies
└─ vite.config.ts   # Vite config
```

---

## 📦 Build & Distribution

The project is configured so that the packaged exe automatically carries and starts the backend.

### One‑command build

```bash
bun run tauri build
```

Under the hood, this runs:

1. **Build the frontend**

   ```bash
   bun run build        # tsc && vite build
   ```

2. **Build the backend sidecar executable**

   ```bash
   bun build src/api/main.ts --compile --outfile src-tauri/binaries/api
   ```

3. Tauri then bundles the frontend static files together with `binaries/api` into the final installer/executable.

### Runtime behavior

- When the user installs/launches the app:
  - Tauri starts the desktop window.
  - It also starts the `api` backend sidecar (listening on `http://localhost:48327`).
- The frontend keeps calling the same local HTTP endpoints as in dev.
- When the window closes, the backend sidecar is shut down cleanly—no zombie processes.

---

## 🧩 How to extend this template

- **Integrate LLMs / OpenAI / local models**
  - Add routes in `src/api/main.ts` that wrap your model calls.
- **Build Dev Agent workflows**
  - Use Prisma to define tasks, sessions, projects, etc., giving your agent long‑term memory.
- **Git / GitHub automation**
  - Leverage `simple-git` and `@octokit/rest` to automate commits, PRs, code analysis, and more.
- **Richer desktop capabilities**
  - Use Tauri APIs for filesystem access, notifications, global shortcuts, etc., to build a truly powerful local Dev Assistant.

---

## 🛠 Useful Scripts

```jsonc
{
  "dev:app": "vite", // frontend only
  "dev:api": "bun --watch src/api/main.ts", // backend only
  "dev": "concurrently \"bun run dev:app\" \"bun run dev:api\"",
  "build": "tsc && vite build", // frontend build only
  "build:tauri": "bun run build && bun build src/api/main.ts --compile --outfile src-tauri/binaries/api",
  "tauri": "tauri", // Tauri CLI entry
  "db:push": "prisma db push", // sync Prisma schema to DB
}
```

---

## 📚 Dev Tips

- Recommended tools:
  - VS Code / Cursor
  - Official Tauri VS Code extension
  - Rust Analyzer
- Design your backend APIs as **small, composable capabilities + high‑level task orchestration**, so they align naturally with agent‑style reasoning.

---

If you’re looking for a **local‑first, easily extensible desktop template to build an AI Dev Agent**, this project is made for you.
