# Context Vault Marketing Site

Standalone marketing website for Context Vault.

## Goals

- Keep marketing pages isolated from the product dashboard app (`packages/app`)
- Reuse the same visual language (tokens, typography, component primitives)
- Support a high-conversion landing page and blog routes

## Routes

- `/` - Landing page
- `/blog` - Blog index
- `/blog/:slug` - Blog post detail

---

## Development & Deployment SOP

### Local Development

```bash
npm install
npm run dev
```

Build preview:

```bash
npm run build
npm run preview
```

---

### Daily Deploy Workflow

No CI pipelines. No secrets management. No waiting. Two steps:

**Step 1 — Commit & push to GitHub (history/source of truth)**

```bash
git add <files>
git commit -m "feat: ..."
git push
```

**Step 2 — Deploy to Vercel**

```bash
npm run deploy
```

`npm run deploy` runs `vite build && vercel --prod` — builds locally and pushes
the `dist/` output directly to Vercel production via the CLI.

> Prerequisites: `vercel` CLI installed globally (`npm i -g vercel`) and linked
> to the project (`vercel link`). Run once per machine; no ongoing secrets or
> environment setup required.

---

### Environment Variables

| Variable            | Purpose                                              | Where set                                           |
| ------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| `VITE_APP_BASE_URL` | Base URL for app conversion links (e.g. `/register`) | `.env.local` (dev) / Vercel project settings (prod) |

---

### Vercel Configuration (`vercel.json`)

| Setting          | Value                                            |
| ---------------- | ------------------------------------------------ |
| Output directory | `dist`                                           |
| SPA fallback     | `/*` → `/index.html`                             |
| API proxy        | `/api/*` → `https://api.context-vault.com/api/*` |
| MCP proxy        | `/mcp` → `https://api.context-vault.com/mcp`     |
| Asset cache      | `public, max-age=31536000, immutable`            |
