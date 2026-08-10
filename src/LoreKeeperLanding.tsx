"use client";

import { useState } from "react";

type Locale = "en" | "fr";

const copy = {
  en: {
    nav: ["Overview", "Game Master", "Players", "Security"],
    switchLabel: "Passer en francais",
    badge: "Local-first RPG character sheets",
    title: "LoreKeeper",
    subtitle:
      "Run your tabletop campaign from the Game Master's computer, invite players by QR code, and keep every character sheet synchronized on the local network.",
    primary: "Discover the workflow",
    secondary: "Voir en francais",
    trust: ["LAN only", "SQLite persistence", "Role-based access", "Live updates"],
    consoleLabel: "Game Master console",
    playerLabel: "Player phone",
    consoleTitle: "Campaign ready",
    consoleBody: "Server online, QR code active, four characters connected.",
    playerTitle: "Philinda Marteline",
    playerBody: "Editable health, locked secrets, synchronized inventory.",
    featuresTitle: "Everything stays at the table",
    featuresIntro:
      "LoreKeeper replaces scattered paper notes with a single local source of truth without turning your campaign into a cloud service.",
    features: [
      {
        title: "Game Master control",
        text: "Create campaigns, assign characters, change permissions, audit recent edits, and revoke devices from one desktop app.",
      },
      {
        title: "Phone-ready sheets",
        text: "Players open their own character on mobile, browse collapsible sections, and edit only the fields you allow.",
      },
      {
        title: "Real-time table flow",
        text: "Health, inventory, skills, conditions, notes, and special abilities update instantly after the server validates the change.",
      },
    ],
    gmTitle: "A quiet command center for the Game Master",
    gmPoints: [
      "Campaign dashboard with LAN address, QR code and connection status.",
      "Full editor for identity, stats, weapons, skills, inventory, purse and notes.",
      "Field and section permissions so a player can edit hit points without seeing GM secrets.",
    ],
    playerTitle2: "A readable sheet for the player in front of you",
    playerPoints: [
      "Portrait mobile layout designed for one-handed play at the table.",
      "Locked, editable and syncing states are visible without relying on hover.",
      "Reconnects by loading the authorized state from the server.",
    ],
    securityTitle: "Designed for local trust, not public exposure",
    securityText:
      "The Game Master's machine hosts the app, Node server and SQLite database. Browsers never talk to the database directly, and player responses use dedicated DTOs so GM notes and secret items never leave the server.",
    stepsTitle: "How a session starts",
    steps: ["Open LoreKeeper", "Create or load a campaign", "Show the QR code", "Players join on phones", "Play with live sheets"],
    ctaTitle: "Less admin drift. More table momentum.",
    ctaText:
      "LoreKeeper keeps the ritual of character sheets, then adds the parts a live table actually needs: permissions, persistence and synchronized updates.",
  },
  fr: {
    nav: ["Apercu", "MJ", "Joueurs", "Securite"],
    switchLabel: "Switch to English",
    badge: "Fiches JDR locales et synchronisees",
    title: "LoreKeeper",
    subtitle:
      "Pilotez votre campagne depuis le PC du maitre de jeu, invitez les joueurs par QR code et gardez chaque fiche synchronisee sur le reseau local.",
    primary: "Decouvrir le parcours",
    secondary: "Read in English",
    trust: ["LAN uniquement", "Persistance SQLite", "Droits par role", "Temps reel"],
    consoleLabel: "Console maitre de jeu",
    playerLabel: "Telephone joueur",
    consoleTitle: "Campagne prete",
    consoleBody: "Serveur actif, QR code disponible, quatre personnages connectes.",
    playerTitle: "Philinda Marteline",
    playerBody: "PV modifiables, secrets verrouilles, inventaire synchronise.",
    featuresTitle: "Toute la partie reste a la table",
    featuresIntro:
      "LoreKeeper remplace les notes papier dispersees par une source de verite locale, sans transformer votre campagne en service cloud.",
    features: [
      {
        title: "Controle du MJ",
        text: "Creez les campagnes, attribuez les personnages, reglez les permissions, consultez l'audit et revoquez les appareils depuis l'app de bureau.",
      },
      {
        title: "Fiches pensees mobile",
        text: "Chaque joueur ouvre sa propre fiche, parcourt des sections repliables et modifie seulement les champs autorises.",
      },
      {
        title: "Rythme de table en direct",
        text: "PV, inventaire, competences, alterations, notes et capacites speciales se mettent a jour apres validation serveur.",
      },
    ],
    gmTitle: "Un centre de commande discret pour le MJ",
    gmPoints: [
      "Tableau de bord avec adresse LAN, QR code et etat des connexions.",
      "Editeur complet pour identite, caracteristiques, armes, competences, inventaire, bourse et notes.",
      "Permissions par champ et section pour autoriser les PV sans exposer les secrets MJ.",
    ],
    playerTitle2: "Une fiche lisible pour le joueur en face de vous",
    playerPoints: [
      "Interface mobile portrait concue pour jouer a une main autour de la table.",
      "Etats verrouille, modifiable et synchronisation visibles sans survol.",
      "Reconnexion par rechargement de l'etat autorise depuis le serveur.",
    ],
    securityTitle: "Pensee pour la confiance locale, pas l'exposition publique",
    securityText:
      "Le PC du MJ heberge l'application, le serveur Node et la base SQLite. Les navigateurs ne parlent jamais directement a la base, et les reponses joueur utilisent des DTO dedies pour que notes MJ et objets secrets ne quittent jamais le serveur.",
    stepsTitle: "Demarrer une session",
    steps: ["Ouvrir LoreKeeper", "Creer ou charger une campagne", "Afficher le QR code", "Les joueurs rejoignent", "Jouer avec des fiches en direct"],
    ctaTitle: "Moins de derive administrative. Plus d'elan a table.",
    ctaText:
      "LoreKeeper garde le rituel de la fiche de personnage et ajoute ce dont une table vivante a besoin: permissions, persistance et mises a jour synchronisees.",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export function LoreKeeperLanding() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = copy[locale];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LoreKeeper home">
          <img src="lorekeeper-logo.png" alt="" />
          <span>LoreKeeper</span>
        </a>
        <nav aria-label="Main navigation">
          {(t.nav as string[]).map((item, index) => (
            <a key={item} href={["#overview", "#gm", "#players", "#security"][index]}>
              {item}
            </a>
          ))}
        </nav>
        <button
          className="language-button"
          type="button"
          onClick={() => setLocale(locale === "en" ? "fr" : "en")}
          aria-label={t.switchLabel as string}
        >
          {locale === "en" ? "FR" : "EN"}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.badge as string}</p>
          <h1>{t.title as string}</h1>
          <p className="hero-text">{t.subtitle as string}</p>
          <div className="hero-actions">
            <a className="button primary" href="#overview">
              {t.primary as string}
            </a>
            <button className="button secondary" type="button" onClick={() => setLocale(locale === "en" ? "fr" : "en")}>
              {t.secondary as string}
            </button>
          </div>
          <div className="trust-row" aria-label="Product foundations">
            {(t.trust as string[]).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="product-scene" aria-label="LoreKeeper interface preview">
          <div className="desktop-preview">
            <div className="preview-top">
              <span>{t.consoleLabel as string}</span>
              <b>192.168.1.42</b>
            </div>
            <div className="status-panel">
              <span className="badge success">Online</span>
              <h2>{t.consoleTitle as string}</h2>
              <p>{t.consoleBody as string}</p>
              <div className="qr-grid" aria-hidden="true">
                {Array.from({ length: 25 }).map((_, i) => (
                  <i key={i} className={i % 2 === 0 || i === 7 || i === 18 ? "filled" : ""} />
                ))}
              </div>
            </div>
            <div className="dashboard-grid">
              {["PV", "DEX", "INV"].map((label, index) => (
                <div key={label} className="metric-card">
                  <span>{label}</span>
                  <b>{[12, 72, 18][index]}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="phone-preview">
            <div className="phone-speaker" />
            <p className="eyebrow">{t.playerLabel as string}</p>
            <h2>{t.playerTitle as string}</h2>
            <p>{t.playerBody as string}</p>
            <div className="health-meter">
              <span />
            </div>
            {["Identity", "Vital state", "Inventory"].map((section, index) => (
              <div key={section} className="sheet-row">
                <b>{locale === "en" ? section : ["Identite", "Etat vital", "Inventaire"][index]}</b>
                <span>{index === 1 ? "Editable" : "Locked"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section intro" id="overview">
        <p className="eyebrow">Overview</p>
        <h2>{t.featuresTitle as string}</h2>
        <p>{t.featuresIntro as string}</p>
        <div className="feature-grid">
          {(t.features as Array<{ title: string; text: string }>).map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span className="index">0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" id="gm">
        <div>
          <p className="eyebrow">Game Master</p>
          <h2>{t.gmTitle as string}</h2>
        </div>
        <ul className="check-list">
          {(t.gmPoints as string[]).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="split-section reverse" id="players">
        <div>
          <p className="eyebrow">Players</p>
          <h2>{t.playerTitle2 as string}</h2>
        </div>
        <ul className="check-list">
          {(t.playerPoints as string[]).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="security-band" id="security">
        <img src="lorekeeper-mark.png" alt="" />
        <div>
          <p className="eyebrow">Security</p>
          <h2>{t.securityTitle as string}</h2>
          <p>{t.securityText as string}</p>
        </div>
      </section>

      <section className="section steps">
        <p className="eyebrow">Session</p>
        <h2>{t.stepsTitle as string}</h2>
        <ol>
          {(t.steps as string[]).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="final-cta">
        <h2>{t.ctaTitle as string}</h2>
        <p>{t.ctaText as string}</p>
      </section>
    </main>
  );
}
