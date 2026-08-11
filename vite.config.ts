import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/LoreKeeperSite/",
  plugins: [react()],
  build: {
    outDir: "out",
    emptyOutDir: true,
  },
});
