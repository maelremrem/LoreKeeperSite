import { useState } from "react";

type Locale = "en" | "fr";

type Feature = {
  title: string;
  text: string;
};

const copy = {
  en: {
    nav: ["For players", "At the table", "Screens", "Local"],
    switchLabel: "Passer en francais",
    badge: "Character sheets for tabletop RPG nights",
    title: "LoreKeeper",
    subtitle:
      "A local app for game masters and players who want live character sheets without losing the paper-table feeling.",
    primary: "See the table flow",
    secondary: "Lire en francais",
    proof: ["No accounts", "No cloud campaign", "Phones join by QR code", "GM keeps control"],
    playerTitle: "Players keep their sheet in their hand",
    playerText:
      "LoreKeeper turns the phone into a clean character sheet: hit points, inventory, skills, conditions, notes and special abilities stay readable during play. Players edit what the GM allows and everything else remains clearly locked.",
    tableTitle: "Built for a noisy table, not a back office",
    tableText:
      "The GM opens the desktop app, starts the local session, shows the QR code, then keeps an eye on characters, health and recent changes while the scene keeps moving.",
    features: [
      {
        title: "Less paper chasing",
        text: "No more asking who updated HP, where the shared item went, or which sheet has the latest skill score.",
      },
      {
        title: "A sheet, not a rules engine",
        text: "LoreKeeper stores the character state and table decisions without forcing death rules, dice math or campaign logic on your group.",
      },
      {
        title: "Secrets stay secret",
        text: "GM notes and hidden inventory are never sent to player browsers. Players only receive the character data they are allowed to see.",
      },
    ] satisfies Feature[],
    screensTitle: "Real LoreKeeper screens",
    screensText:
      "The site uses captures from the actual application surfaces: the GM console, the mobile player sheet and the table display.",
    desktopCaption: "GM console: campaign, QR access, connected players and character overview.",
    playerCaption: "Player sheet: mobile-first sections, editable fields and sync state.",
    displayCaption: "Table display: a shared view for the group when you want one.",
    sessionTitle: "A session in five beats",
    steps: ["Create the campaign", "Assign characters", "Show the QR code", "Players open their sheet", "Play with live updates"],
    localTitle: "Local by design",
    localText:
      "LoreKeeper runs on the GM computer, stores the campaign in SQLite and serves the player interface on the local network. It is made for people sitting around the same table.",
    ctaTitle: "Keep the ritual. Remove the friction.",
    ctaText:
      "LoreKeeper is for roleplayers who love character sheets, but would rather spend the evening making choices than reconciling paper copies.",
  },
  fr: {
    nav: ["Joueurs", "A la table", "Ecrans", "Local"],
    switchLabel: "Switch to English",
    badge: "Fiches de personnage pour soirees JDR",
    title: "LoreKeeper",
    subtitle:
      "Une app locale pour MJ et joueurs qui veulent des fiches vivantes sans perdre l'ambiance de la table papier.",
    primary: "Voir le rythme de jeu",
    secondary: "Read in English",
    proof: ["Pas de comptes", "Pas de campagne cloud", "Connexion par QR code", "Le MJ garde la main"],
    playerTitle: "Les joueurs gardent leur fiche en main",
    playerText:
      "LoreKeeper transforme le telephone en fiche lisible: points de vie, inventaire, competences, alterations, notes et capacites speciales restent accessibles pendant la partie. Les joueurs modifient ce que le MJ autorise, le reste est clairement verrouille.",
    tableTitle: "Pensee pour une vraie table, pas pour un back-office",
    tableText:
      "Le MJ ouvre l'application de bureau, lance la session locale, affiche le QR code puis garde un oeil sur les personnages, les PV et les derniers changements pendant que la scene continue.",
    features: [
      {
        title: "Moins de chasse au papier",
        text: "Plus besoin de demander qui a modifie ses PV, ou est passe l'objet commun, ou quelle fiche porte le dernier score de competence.",
      },
      {
        title: "Une fiche, pas un moteur de regles",
        text: "LoreKeeper conserve l'etat des personnages et les decisions de table sans imposer de regle de mort, de calcul de des ou de logique de campagne.",
      },
      {
        title: "Les secrets restent secrets",
        text: "Les notes MJ et objets caches ne sont jamais envoyes aux navigateurs joueurs. Chaque joueur recoit uniquement ce qu'il a le droit de voir.",
      },
    ] satisfies Feature[],
    screensTitle: "De vrais ecrans LoreKeeper",
    screensText:
      "Le site utilise des captures des surfaces reelles de l'application: console MJ, fiche mobile joueur et affichage de table.",
    desktopCaption: "Console MJ: campagne, acces QR, joueurs connectes et vue des personnages.",
    playerCaption: "Fiche joueur: sections mobiles, champs modifiables et etat de synchronisation.",
    displayCaption: "Affichage de table: une vue partagee pour le groupe quand vous en avez besoin.",
    sessionTitle: "Une session en cinq temps",
    steps: ["Creer la campagne", "Attribuer les fiches", "Afficher le QR code", "Les joueurs ouvrent leur fiche", "Jouer avec les mises a jour"],
    localTitle: "Local par principe",
    localText:
      "LoreKeeper tourne sur le PC du MJ, stocke la campagne en SQLite et sert l'interface joueur sur le reseau local. C'est fait pour les gens assis autour de la meme table.",
    ctaTitle: "Gardez le rituel. Enlevez le frottement.",
    ctaText:
      "LoreKeeper s'adresse aux rolistes qui aiment les fiches de personnage, mais preferent passer la soiree a faire des choix plutot qu'a reconciler des copies papier.",
  },
} satisfies Record<Locale, Record<string, unknown>>;

const screenshots = [
  { src: "screenshots/lorekeeper-gm-console.png", key: "desktopCaption" },
  { src: "screenshots/lorekeeper-player-sheet.png", key: "playerCaption" },
  { src: "screenshots/lorekeeper-table-display.png", key: "displayCaption" },
];

export function LoreKeeperLanding() {
  const [locale, setLocale] = useState<Locale>("fr");
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
            <a key={item} href={["#players", "#table", "#screens", "#local"][index]}>
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
            <a className="button primary" href="#screens">
              {t.primary as string}
            </a>
            <button className="button secondary" type="button" onClick={() => setLocale(locale === "en" ? "fr" : "en")}>
              {t.secondary as string}
            </button>
          </div>
          <div className="trust-row" aria-label="LoreKeeper foundations">
            {(t.proof as string[]).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <figure className="hero-screen">
          <img src="screenshots/lorekeeper-gm-console.png" alt="" />
        </figure>
      </section>

      <section className="story-section" id="players">
        <div>
          <p className="eyebrow">Players</p>
          <h2>{t.playerTitle as string}</h2>
          <p>{t.playerText as string}</p>
        </div>
        <figure className="phone-shot">
          <img src="screenshots/lorekeeper-player-sheet.png" alt="" />
        </figure>
      </section>

      <section className="story-section reverse" id="table">
        <div>
          <p className="eyebrow">Game night</p>
          <h2>{t.tableTitle as string}</h2>
          <p>{t.tableText as string}</p>
        </div>
        <div className="feature-grid">
          {(t.features as Feature[]).map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span className="index">0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section screens" id="screens">
        <p className="eyebrow">Screens</p>
        <h2>{t.screensTitle as string}</h2>
        <p>{t.screensText as string}</p>
        <div className="screenshot-grid">
          {screenshots.map((shot) => (
            <figure key={shot.src} className={shot.key === "playerCaption" ? "mobile-frame" : ""}>
              <img src={shot.src} alt="" />
              <figcaption>{t[shot.key] as string}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section steps">
        <p className="eyebrow">Session</p>
        <h2>{t.sessionTitle as string}</h2>
        <ol>
          {(t.steps as string[]).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="local-band" id="local">
        <img src="lorekeeper-mark.png" alt="" />
        <div>
          <p className="eyebrow">Local-first</p>
          <h2>{t.localTitle as string}</h2>
          <p>{t.localText as string}</p>
        </div>
      </section>

      <section className="final-cta">
        <h2>{t.ctaTitle as string}</h2>
        <p>{t.ctaText as string}</p>
      </section>
    </main>
  );
}
