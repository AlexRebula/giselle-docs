# Giselle Docs

`giselle-docs` is the unified documentation site for the Giselle open-source ecosystem — built with [Docusaurus](https://docusaurus.io/) and pulling docs directly from the three sibling package repositories.

---

## The mango tree

The Giselle packages are a Philippine mango tree. The trunk is the shared foundation — design conventions, TypeScript patterns, test discipline — that all packages grow from. Each package is one mango on the tree, at its own stage of ripeness.

`giselle-docs` is the **green mango** 🟢 — the youngest shoot on the tree. Its job is to show the full tree: one docs site, four packages, each mango at its own ripeness stage. The wide watercolour hero illustration that eventually sits at the top of this site shows exactly that — the tree in full, with per-package label badges on each fruit. As the packages mature and the docs fill in, this mango will turn yellow-green alongside them.

Ripeness scale: 🟢 alpha → 🟡 beta → 🟠 stable → 🟤 LTS.

---

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
