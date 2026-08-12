import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("builds a static LoreKeeper Pages site", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const page = await readFile(new URL("../src/LoreKeeperLanding.tsx", import.meta.url), "utf8");
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");

  assert.match(html, /LoreKeeper - Fiches JDR locales/);
  assert.match(html, /\/LoreKeeperSite\/assets\//);
  assert.match(page, /Fiches de personnage pour soirées JDR/);
  assert.match(page, /screenshots\/lorekeeper-gm-console\.png/);
  assert.match(page, /Les joueurs gardent leur fiche en main/);
  assert.match(page, /https:\/\/github\.com\/maelremrem\/lorekeeper/);
  assert.match(page, /Ouvrir le dépôt GitHub de l'application LoreKeeper/);
  assert.match(page, /Télécharger LoreKeeper/);
  assert.match(page, /https:\/\/api\.github\.com\/repos\/maelremrem\/lorekeeper\/releases\/latest/);
  assert.match(page, /macOS Apple Silicon/);
  assert.match(page, /macOS Intel x64/);
  assert.match(page, /Télécharger pour Windows/);
  assert.match(page, /Télécharger pour Linux/);
  assert.match(page, /Bientôt disponible/);
  assert.match(page, /Retirez la frustration/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|drizzle|cloudflare|next|openai/i);
});

test("keeps starter and server artifacts out of the source tree", async () => {
  await assert.rejects(access(new URL("app", root)));
  await assert.rejects(access(new URL("worker", root)));
  await assert.rejects(access(new URL("db", root)));
  await assert.rejects(access(new URL("drizzle", root)));
});
