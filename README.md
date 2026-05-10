# OculoCalc — TED Module

Progressive web app: thyroid eye disease classification suite (CAS, EUGOGO, VISA, NO SPECS).

## Files in this repo

- `index.html` — the entire app (UI + logic)
- `manifest.json` — tells iOS/Android this is an installable app
- `sw.js` — service worker for offline use
- `apple-touch-icon.png` — iPhone home screen icon (180×180)
- `icon-192.png`, `icon-512.png` — Android / general PWA icons
- `favicon-32.png` — browser tab icon

## How to deploy

1. Upload all files to a GitHub repo
2. Connect repo to Vercel
3. Vercel gives a URL like `oculocalc-ted.vercel.app`
4. Open URL in iPhone Safari → Share → Add to Home Screen

## Local testing

Serve from any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing

Everything is in `index.html` — open it in any text editor. Each module is in its own
section (search for `// CAS`, `// EUGOGO`, etc.).
