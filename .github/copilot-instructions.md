# @alexrebula/giselle-docs — Copilot Instructions

This is the unified documentation site for the `@alexrebula/giselle-*` open-source ecosystem.
Built with [Docusaurus](https://docusaurus.io/). MIT licensed.

## What this site is

A single Docusaurus instance that pulls documentation from three sibling package repos:
- `giselle-mui` — MUI wrapper component library
- `giselle-sections-sdk` — framework-agnostic data SDK
- `giselle-ui` — standalone CSS-custom-properties component library

No personal content. No proprietary code. No imports from the `alexrebula` private portfolio.

## Stack

- Docusaurus 3.x (static site generator)
- TypeScript (strict)
- React (via Docusaurus)
- Vercel for deployment

## Brand identity — the Giselle mango tree

The Giselle ecosystem is named after the Filipino partner of the author. The Philippine national fruit is the Carabao mango — both the logo mark and the ecosystem metaphor.

- **The tree** = shared foundation: design conventions, TypeScript patterns, test discipline
- **Each branch** = a package (`giselle-mui`, `giselle-sections-sdk`, `giselle-ui`, `giselle-docs`)
- **Each mango** = a release at its own ripeness stage

Ripeness scale: 🟢 green = alpha · 🟡 yellow-green = beta · 🟠 golden = stable · 🟤 amber = LTS

`giselle-docs` is the **green mango** — youngest shoot on the tree. Its job is to show the full tree: one site, four packages, each at its own ripeness. As the packages mature, this mango turns yellow-green alongside them.

**Palette:** Mango gold `#F5A623` · Deep grove `#2E7D32` · Lime `#76C442` · Ripe flesh `#FFF3CD` · Dark grove `#1A2B1A` · Warm tan `#F5EDDC`

**G lettermark:** The bowl of a capital G mirrors the elongated S-curve of a Carabao mango silhouette — readable as letter or fruit without labelling.

**WC-6:** The planned wide hero illustration — a watercolour mango tree with per-package label badges on each fruit. A placeholder is wired in `src/pages/index.tsx` and `src/pages/index.module.css`. Replace the `.heroIllustrationPlaceholder` div with `<img src="/img/wc-6-hero.png" alt="Giselle ecosystem — Philippine mango tree watercolour" />` once the asset is generated from the Firefly prompt. Full prompt: see `alexrebula/docs/brand/logo-concept.md` Track A, WC-6.

## Copyright rule

This site is MIT-licensed and public. It must contain zero code or content derived from any proprietary theme or kit.

**Hard rules — non-negotiable:**

1. **No Minimals code.** Identifiers like `varAlpha`, `varFade`, `varBlur`, `customShadows`, `_mock` must never appear here.
2. **No imports from the `alexrebula` portfolio.** This site must not import from `alexrebula/src/`.
3. **No proprietary dependencies.** Only Docusaurus, React, and fully open-source utilities.

## What Copilot should help build

- Docusaurus config updates when new package docs are wired in
- Home page improvements (`src/pages/index.tsx` and `src/pages/index.module.css`)
- Replacing the WC-6 hero placeholder once the illustration asset is available
- Any Docusaurus plugin configuration for multi-instance docs (one plugin instance per package)
- `sidebars.ts` updates when new docs are added
