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
repo `maelremrem/lorekeeper` via l'API GitHub. Elle attend uniquement des
versions portables en `.zip`, nommées ainsi:

- macOS Apple Silicon: `LoreKeeper-0.1.0-macos-arm64.zip`
- macOS Intel x64: `LoreKeeper-0.1.0-macos-x64.zip`
- Windows: `LoreKeeper-0.1.0-windows-x64.zip`
- Linux: `LoreKeeper-0.1.0-linux-x64.zip`

Le numéro `0.1.0` est un exemple: il doit suivre le numéro de la release.
