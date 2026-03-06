# Aoun Project

Next.js app (App Router) using React + TypeScript.

## Requirements

- Ubuntu/Linux or Windows
- Node.js **>= 20.9.0** (required by Next.js in this project)
- pnpm

## 1) Install Node.js 20 on Ubuntu (strict commands)

Run exactly:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

Expected: `v20.x` (or newer).

If you still see Node 18, run:

```bash
sudo apt remove -y nodejs
sudo apt autoremove -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

## 2) Install Node.js 20 on Windows (strict commands)

Open **PowerShell as Administrator** and run:

```powershell
winget install OpenJS.NodeJS.LTS
node -v
```

Expected: `v20.x` (or newer).

If `node -v` still shows old version, close and reopen PowerShell, then run:

```powershell
where.exe node
node -v
```

## 3) Enable pnpm

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

## 4) Install dependencies

From project root:

```bash
cd /home/mohamed-abdelhady/Aoun
pnpm install
```

Windows path example:

```powershell
cd C:\path\to\Aoun
pnpm install
```

## 5) Run in development

```bash
pnpm dev
```

Open: http://localhost:3000

## 6) Production commands

```bash
pnpm build
pnpm start
```

## 7) Lint

```bash
pnpm lint
```

## Notes

- This is a **web** project (Next.js), not Android/React Native.
- `npm run android` will fail because there is no `android` script in `package.json`.
- All screens/components are rendered through `app/page.tsx` flow.
