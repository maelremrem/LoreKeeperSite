# LoreKeeperSite

Site vitrine bilingue de LoreKeeper, l'application locale de fiches de personnage pour tables de jeu de rôle.

## Stack

- Vite
- React
- TypeScript
- GitHub Pages via GitHub Actions

## Scripts

```bash
npm install
npm run dev
npm run build
npm test
```

Le build statique est écrit dans `out/` et publié automatiquement par `.github/workflows/pages.yml`.

## Captures

Les images du site sont de vraies captures des surfaces LoreKeeper générées
depuis le projet applicatif, afin de montrer l'application telle qu'elle est
utilisée autour d'une table.

## Téléchargements

La section de téléchargement lit automatiquement la dernière release publique du
repo `maelremrem/lorekeeper` via l'API GitHub. Les assets sont associés aux
boutons à partir de leur nom:

- macOS Apple Silicon: `mac`, `darwin`, `osx`, `dmg` ou `pkg` + `arm64`,
  `aarch64` ou `apple-silicon`
- macOS Intel x64: `mac`, `darwin`, `osx`, `dmg` ou `pkg` + `x64`,
  `amd64` ou `intel`
- Windows: `windows`, `win32`, `win64`, `win`, `setup`, `.exe` ou `.msi`
- Linux: `linux`, `appimage`, `.deb`, `.rpm`, `x86_64.tar` ou `amd64.tar`
