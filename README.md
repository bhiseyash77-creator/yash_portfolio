# Yash Bhise Portfolio

Production-ready React + Vite portfolio for Yash Bhise.

## Stack
- React 18
- Vite 5
- Three.js / React Three Fiber
- Framer Motion
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Netlify

This repository is configured with `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 20
- Optional npm dependencies are enabled to avoid platform-specific Rollup installation issues.

Do not commit `node_modules` or `dist`.
