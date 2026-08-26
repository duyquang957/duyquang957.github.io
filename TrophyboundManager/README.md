# Trophybound Manager — static website

Portable landing page with no framework, package install, build step, CDN, or server-side runtime. Upload the contents of this folder to any static host and use `index.html` as the entry point.

## Preview locally

```bash
python3 -m http.server 4173 --directory Web
```

Open `http://127.0.0.1:4173/`.

## Store links

The repository does not currently contain verified public App Store or Google Play listing URLs, so both store buttons intentionally show a localized “coming soon” message.

When the listings are live, edit only `STORE_URLS` at the top of `assets/js/app.js`:

```js
const STORE_URLS = Object.freeze({
  appStore: "https://apps.apple.com/app/id...",
  googlePlay: "https://play.google.com/store/apps/details?id=...",
});
```

The buttons, labels, targets, and accessibility text switch to the live state automatically.

After deployment, also replace the relative `og:image` value in `index.html` with the absolute URL on the final domain so social preview crawlers can resolve it reliably.

## Languages

The website and language picker are fully localized across all 15 locales supported by the Unity project, including both Portuguese variants, English (Singapore), Hindi, Thai, Indonesian, and Arabic RTL.

Privacy, Terms, and Account deletion are fully translated across all 15 locales. English remains the complete static HTML fallback for store reviewers and crawlers; the browser loads only the selected locale bundle and reuses the same `trophybound-language` preference as the landing page. Arabic switches the document to RTL automatically.

## Legal pages

- `privacy-policy.html` describes the game’s Firebase accounts and cloud saves, multiplayer and social data, analytics, diagnostics, advertising, and in-app purchases.
- `terms.html` contains the gameplay, account, purchase, advertising, community, and acceptable-use terms.
- `account-deletion.html` provides both the in-game deletion path and a public email request path for players who cannot access the app.
- `assets/js/legal-i18n.js` switches legal-page content, interface labels, metadata, direction, and saved language.
- `assets/js/legal-locales/` contains one lazy-loaded legal bundle per non-English locale.

Before release, confirm the public support email, publisher legal identity, retention commitments, store disclosures, and the backend deletion scope. The current automatic app flow does not purge separately stored multiplayer and social records; those records require the support workflow described on the deletion page until the backend implements a complete purge.

## Media and performance

- Original player/stadium hero and cinematic trophy scene were generated specifically for this site with no real player, club, sponsor, or competition marks.
- Gameplay screenshots, app icon, and individual trophy designs are optimized derivatives of assets owned by this project.
- The external reference image is not copied, cropped, or shipped.
- Responsive AVIF images are preferred with WebP/JPEG fallbacks.
- The complete optimized image folder is approximately 1.8 MB.

## Structure

```text
Web/
├── index.html
├── privacy-policy.html
├── terms.html
├── account-deletion.html
├── README.md
└── assets/
    ├── css/
    │   ├── styles.css
    │   └── legal.css
    ├── js/
    │   ├── app.js
    │   ├── translations-extra.js
    │   ├── legal-i18n.js
    │   └── legal-locales/
    └── images/
```
