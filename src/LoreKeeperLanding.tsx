import { useEffect, useMemo, useState } from "react";

type Locale = "en" | "fr";

type Feature = {
  title: string;
  text: string;
};

type Platform = "macArm" | "macX64" | "windows" | "linux";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type DownloadState = "loading" | "ready" | "unavailable";

type DownloadOption = {
  platform: Platform;
  href?: string;
  state: DownloadState;
};

const copy = {
  en: {
    nav: ["For players", "At the table", "Screens", "Local", "Download"],
    switchLabel: "Passer en français",
    badge: "Character sheets for tabletop RPG nights",
    title: "LoreKeeper",
    subtitle:
      "A local app for game masters and players who want live character sheets without losing the paper-table feeling.",
    primary: "See the table flow",
    repo: "Application repo",
    repoLabel: "Open the LoreKeeper application repository on GitHub",
    secondary: "Lire en français",
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
    downloadTitle: "Download LoreKeeper",
    downloadText:
      "The buttons automatically link to the latest packages published in the LoreKeeper GitHub release.",
    loadingTooltip: "Looking for the latest release",
    soonTooltip: "Available soon",
    downloads: {
      macArm: "macOS Apple Silicon",
      macX64: "macOS x64",
      windows: "Download for Windows",
      linux: "Download for Linux",
    } satisfies Record<Platform, string>,
    ctaTitle: "Keep the ritual. Remove the friction.",
    ctaText:
      "LoreKeeper is for roleplayers who love character sheets, but would rather spend the evening making choices than reconciling paper copies.",
  },
  fr: {
    nav: ["Joueurs", "À la table", "Écrans", "Local", "Télécharger"],
    switchLabel: "Switch to English",
    badge: "Fiches de personnage pour soirées JDR",
    title: "LoreKeeper",
    subtitle:
      "Une app locale pour MJ et joueurs qui veulent des fiches vivantes sans perdre l'ambiance de la table papier.",
    primary: "Voir le rythme de jeu",
    repo: "Repo de l'application",
    repoLabel: "Ouvrir le dépôt GitHub de l'application LoreKeeper",
    secondary: "Read in English",
    proof: ["Pas de comptes", "Pas de campagne cloud", "Connexion par QR code", "Le MJ garde la main"],
    playerTitle: "Les joueurs gardent leur fiche en main",
    playerText:
      "LoreKeeper transforme le téléphone en fiche lisible: points de vie, inventaire, compétences, altérations, notes et capacités spéciales restent accessibles pendant la partie. Les joueurs modifient ce que le MJ autorise, le reste est clairement verrouillé.",
    tableTitle: "Pensée pour une vraie table, pas pour un back-office",
    tableText:
      "Le MJ ouvre l'application de bureau, lance la session locale, affiche le QR code puis garde un œil sur les personnages, les PV et les derniers changements pendant que la scène continue.",
    features: [
      {
        title: "Moins de chasse au papier",
        text: "Plus besoin de demander qui a modifié ses PV, où est passé l'objet commun, ou quelle fiche porte le dernier score de compétence.",
      },
      {
        title: "Une fiche, pas un moteur de règles",
        text: "LoreKeeper conserve l'état des personnages et les décisions de table sans imposer de règle de mort, de calcul de dés ou de logique de campagne.",
      },
      {
        title: "Les secrets restent secrets",
        text: "Les notes MJ et objets cachés ne sont jamais envoyés aux navigateurs joueurs. Chaque joueur reçoit uniquement ce qu'il a le droit de voir.",
      },
    ] satisfies Feature[],
    screensTitle: "De vrais écrans LoreKeeper",
    screensText:
      "Le site utilise des captures des surfaces réelles de l'application: console MJ, fiche mobile joueur et affichage de table.",
    desktopCaption: "Console MJ: campagne, accès QR, joueurs connectés et vue des personnages.",
    playerCaption: "Fiche joueur: sections mobiles, champs modifiables et état de synchronisation.",
    displayCaption: "Affichage de table: une vue partagée pour le groupe quand vous en avez besoin.",
    sessionTitle: "Une session en cinq temps",
    steps: ["Créer la campagne", "Attribuer les fiches", "Afficher le QR code", "Les joueurs ouvrent leur fiche", "Jouer avec les mises à jour"],
    localTitle: "Local par principe",
    localText:
      "LoreKeeper tourne sur le PC du MJ, stocke la campagne en SQLite et sert l'interface joueur sur le réseau local. C'est fait pour les gens assis autour de la même table.",
    downloadTitle: "Télécharger LoreKeeper",
    downloadText:
      "Les boutons pointent automatiquement vers les derniers packages publiés dans la release GitHub de LoreKeeper.",
    loadingTooltip: "Recherche de la dernière release",
    soonTooltip: "Bientôt disponible",
    downloads: {
      macArm: "macOS Apple Silicon",
      macX64: "macOS x64",
      windows: "Télécharger pour Windows",
      linux: "Télécharger pour Linux",
    } satisfies Record<Platform, string>,
    ctaTitle: "Gardez le rituel. Retirez la frustration.",
    ctaText:
      "LoreKeeper s'adresse aux rôlistes qui aiment les fiches de personnage, mais préfèrent passer la soirée à faire des choix plutôt qu'à réconcilier des copies papier.",
  },
} satisfies Record<Locale, Record<string, unknown>>;

const appRepoUrl = "https://github.com/maelremrem/lorekeeper";
const latestReleaseApiUrl = "https://api.github.com/repos/maelremrem/lorekeeper/releases/latest";

const screenshots = [
  { src: "screenshots/lorekeeper-gm-console.png", key: "desktopCaption" },
  { src: "screenshots/lorekeeper-player-sheet.png", key: "playerCaption" },
  { src: "screenshots/lorekeeper-table-display.png", key: "displayCaption" },
];

const platforms = ["macArm", "macX64", "windows", "linux"] satisfies Platform[];

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "macArm" || platform === "macX64") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M16.18 12.2c-.02-2.12 1.73-3.15 1.81-3.2-1-1.45-2.53-1.65-3.06-1.67-1.29-.13-2.54.77-3.2.77-.67 0-1.68-.75-2.77-.73-1.42.02-2.74.84-3.47 2.13-1.5 2.6-.38 6.42 1.06 8.52.72 1.03 1.56 2.18 2.66 2.14 1.07-.04 1.47-.69 2.77-.69 1.29 0 1.65.69 2.78.67 1.15-.02 1.87-1.04 2.56-2.08.83-1.18 1.16-2.35 1.17-2.41-.03-.01-2.28-.88-2.31-3.45Zm-2.09-6.24c.58-.73.97-1.71.86-2.72-.84.04-1.9.58-2.5 1.28-.54.63-1.03 1.66-.9 2.63.94.07 1.94-.47 2.54-1.19Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "windows") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3 5.25 10.5 4v7.35H3V5.25Zm8.5-1.4L21 2.3v9.05h-9.5v-7.5ZM3 12.65h7.5V20L3 18.75v-6.1Zm8.5 0H21v9.05l-9.5-1.55v-7.5Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M5 18.4h14v1.8H5v-1.8Zm1.6-12.6h10.8c.9 0 1.6.72 1.6 1.6v8.1c0 .9-.7 1.6-1.6 1.6H6.6A1.6 1.6 0 0 1 5 15.5V7.4c0-.88.72-1.6 1.6-1.6Zm1.2 3.05 2.35 2.35-2.35 2.35 1.12 1.12 3.48-3.47-3.48-3.48-1.12 1.13Zm5.1 4.55V15h4v-1.6h-4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function getAssetForPlatform(assets: ReleaseAsset[], platform: Platform) {
  return assets.find((asset) => {
    const name = asset.name.toLowerCase();

    if (platform === "macArm") {
      return /(?:mac|darwin|osx|dmg|pkg)/.test(name) && /(?:arm64|aarch64|apple[-_\s]?silicon)/.test(name);
    }

    if (platform === "macX64") {
      return /(?:mac|darwin|osx|dmg|pkg)/.test(name) && /(?:x64|amd64|intel)/.test(name);
    }

    if (platform === "windows") {
      return /(?:windows|win32|win64|win|setup|\.exe|\.msi)/.test(name);
    }

    return /(?:linux|appimage|\.deb|\.rpm|x86_64\.tar|amd64\.tar)/.test(name);
  });
}

export function LoreKeeperLanding() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [releaseAssets, setReleaseAssets] = useState<ReleaseAsset[] | null>(null);
  const t = copy[locale];

  useEffect(() => {
    let ignore = false;

    fetch(latestReleaseApiUrl, { headers: { Accept: "application/vnd.github+json" } })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub release lookup failed: ${response.status}`);
        }

        return response.json() as Promise<{ assets?: ReleaseAsset[] }>;
      })
      .then((release) => {
        if (!ignore) {
          setReleaseAssets(release.assets ?? []);
        }
      })
      .catch(() => {
        if (!ignore) {
          setReleaseAssets([]);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const downloadOptions = useMemo<DownloadOption[]>(
    () =>
      platforms.map((platform) => {
        if (!releaseAssets) {
          return { platform, state: "loading" };
        }

        const asset = getAssetForPlatform(releaseAssets, platform);

        if (!asset) {
          return { platform, state: "unavailable" };
        }

        return { platform, href: asset.browser_download_url, state: "ready" };
      }),
    [releaseAssets],
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LoreKeeper home">
          <img src="lorekeeper-logo.png" alt="" />
          <span>LoreKeeper</span>
        </a>
        <nav aria-label="Main navigation">
          {(t.nav as string[]).map((item, index) => (
            <a key={item} href={["#players", "#table", "#screens", "#local", "#download"][index]}>
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="icon-button" href={appRepoUrl} rel="noreferrer" target="_blank" aria-label={t.repoLabel as string}>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.86 8.34 6.84 9.69.5.1.68-.22.68-.49v-1.9c-2.78.62-3.36-1.22-3.36-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.9c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.15 10.15 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <button
            className="language-button"
            type="button"
            onClick={() => setLocale(locale === "en" ? "fr" : "en")}
            aria-label={t.switchLabel as string}
          >
            {locale === "en" ? "FR" : "EN"}
          </button>
        </div>
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
            <a
              className="button secondary"
              href={appRepoUrl}
              rel="noreferrer"
              target="_blank"
            >
              {t.repo as string}
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

      <section className="section downloads" id="download">
        <p className="eyebrow">Downloads</p>
        <h2>{t.downloadTitle as string}</h2>
        <p>{t.downloadText as string}</p>
        <div className="download-grid">
          {downloadOptions.map((download) => (
            <span
              className="download-tooltip"
              data-tooltip={download.state === "loading" ? (t.loadingTooltip as string) : (t.soonTooltip as string)}
              data-enabled={download.state === "ready"}
              key={download.platform}
            >
              {download.href ? (
                <a className="download-button" href={download.href} rel="noreferrer" target="_blank">
                  <PlatformIcon platform={download.platform} />
                  <span>{(t.downloads as Record<Platform, string>)[download.platform]}</span>
                </a>
              ) : (
                <button className="download-button" type="button" disabled>
                  <PlatformIcon platform={download.platform} />
                  <span>{(t.downloads as Record<Platform, string>)[download.platform]}</span>
                </button>
              )}
            </span>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <h2>{t.ctaTitle as string}</h2>
        <p>{t.ctaText as string}</p>
      </section>
    </main>
  );
}
