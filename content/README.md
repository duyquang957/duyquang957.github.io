# Editing the Playluma catalogue

The homepage reads [`catalog-data.js`](catalog-data.js) directly. This is the only file to edit when adding, removing or reordering catalogue links. The order of the objects in `items` is the order shown in the library.

Because this file loads as a normal local script, the library works both on GitHub Pages and when `index.html` is opened directly without a local server.

## Add a game or app

1. Copy the new project folder into the repository. A folder link must contain an `index.html` file.
2. Add one object to `items` in `catalog-data.js`.
3. Run `node tools/validate-catalog.mjs` from the repository root.
4. Open the homepage locally and check the card, search and filter results.

Run `node tools/test-catalog-validator.mjs` to exercise the validator's valid, hidden, external, duplicate, unsafe-URL and missing-asset cases.

Required fields:

- `id`: unique lowercase kebab-case identifier.
- `title`: display name.
- `kind`: either `game` or `app`.
- `href`: local HTML page/folder or a secure `https://` link.
- `summary`: short English description used in the selected-title hero.
- `cover`: crop-safe landscape image used on the card and hero.
- `icon`: square product icon.

Optional fields:

- `platforms`: an array of platform names.
- `badge`: short category label.
- `accent`: CSS hex color such as `#3b82f6`.
- `hidden`: set to `true` to keep an entry in the file without displaying it.

Local paths are resolved from the repository root, not from the `content` folder. Use exact filename casing because GitHub Pages is case-sensitive. Directory links must end in `/`, for example `MyNewGame/`.

The site is static, so copying a folder alone cannot update the homepage. Adding its one catalogue object is the intentional publication step.
