import React from "react";
import { createRoot } from "react-dom/client";
import { LoreKeeperLanding } from "./LoreKeeperLanding";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoreKeeperLanding />
  </React.StrictMode>,
);
