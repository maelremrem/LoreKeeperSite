import React from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import "./pages.css";
import { LoreKeeperLanding } from "../src/LoreKeeperLanding";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoreKeeperLanding />
  </React.StrictMode>,
);
