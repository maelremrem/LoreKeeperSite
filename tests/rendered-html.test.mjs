import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the LoreKeeper landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>LoreKeeper - Local RPG Character Sheets<\/title>/i);
  assert.match(html, /LoreKeeper/);
  assert.match(html, /Local-first RPG character sheets/);
  assert.match(html, /Passer en francais/);
  assert.match(html, /Game Master console/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("keeps the finished site free of starter artifacts", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../src/LoreKeeperLanding.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"use client"/);
  assert.match(page, /const copy/);
  assert.match(page, /lorekeeper-logo\.png/);
  assert.match(layout, /openGraph/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"build:pages"/);

  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
