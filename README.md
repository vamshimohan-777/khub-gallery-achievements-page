## khub-gallery-achievements-page

Gallery & Achievements page workspace (Vite + React + TypeScript + Tailwind).

### Apps in this repo

- **Main app**: `artifacts/ai-hub/`
  - Paradigm sections with **Achievements** (hover preview + click for details) and **Gallery** (click to view images).
  - Side “pearl” wheel navigation in `artifacts/ai-hub/src/components/PearlNav.tsx`.
- **Mockup sandbox**: `artifacts/mockup-sandbox/` (component preview / playground)

### Prerequisites

- Node.js (LTS recommended)
- pnpm

### Install

From the repo root:

```bash
pnpm install
```

### Run the backend API server

The frontend requires the backend to load paradigm data and photos.

**Start the API server** (from the repo root):

```bash
cd artifacts/api-server
pnpm dev
```

The server will start on `http://localhost:5000`.

**Note for Windows users:** The `dev` script uses `export` which doesn't work in PowerShell or Command Prompt. Use one of these instead:

**PowerShell:**
```powershell
$env:NODE_ENV='development'; pnpm run build; pnpm run start
```

**Command Prompt (cmd):**
```cmd
set NODE_ENV=development && pnpm run build && pnpm run start
```

### Run the main app

```bash
cd artifacts/ai-hub
pnpm dev
```

Then open the local URL printed by Vite (usually `http://localhost:5173`).

**Note:** Make sure the backend API server is running before starting the frontend, so that images and data load correctly.

### Typecheck (whole workspace)

From the repo root:

```bash
pnpm run typecheck
```

### Where to edit content

- **Paradigms data**: `artifacts/ai-hub/src/data/paradigms.ts`
  - **`siteUrl`**: placeholder per-paradigm links (replace with real URLs)
  - **`achievements[].desc`**: one-line hover copy
  - **`achievements[].details`**: longer click-to-open copy

