#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cataloguePath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(repositoryRoot, "content", "catalog-data.js");
const catalogueLabel = path.relative(repositoryRoot, cataloguePath) || "content/catalog-data.js";
const allowedRootKeys = new Set(["version", "items"]);
const requiredItemKeys = ["id", "title", "kind", "href", "summary", "cover", "icon"];
const allowedItemKeys = new Set([...requiredItemKeys, "platforms", "badge", "accent", "hidden"]);
const imageExtensions = new Set([".avif", ".webp", ".png", ".jpg", ".jpeg", ".svg", ".gif"]);
const errors = [];

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}

function report(location, message) {
  errors.push(`${location}: ${message}`);
}

function validateExactKeys(value, allowed, location) {
  Object.keys(value).forEach((key) => {
    if (!allowed.has(key)) report(location, `unsupported key ${JSON.stringify(key)}`);
  });
}

function validateText(value, location) {
  if (typeof value !== "string" || value.length === 0 || value !== value.trim()) {
    report(location, "must be a non-empty trimmed string");
    return false;
  }
  return true;
}

function parseCatalogue(raw, sourcePath) {
  if (path.extname(sourcePath).toLowerCase() === ".json") return JSON.parse(raw);
  const wrapped = raw.match(/^\s*window\.PLAYLUMA_CATALOG\s*=\s*([\s\S]*?)\s*;\s*$/);
  if (!wrapped) {
    throw new Error("must contain only: window.PLAYLUMA_CATALOG = { ... };");
  }
  return JSON.parse(wrapped[1]);
}

function validateUrlSyntax(value, location) {
  if (!validateText(value, location)) return null;
  if (/[\u0000-\u001f\u007f]/.test(value)) {
    report(location, "control characters are not allowed");
    return null;
  }
  if (value.startsWith("//") || value.includes("\\")) {
    report(location, "protocol-relative URLs and backslashes are not allowed");
    return null;
  }
  if (/^https:\/\//i.test(value)) {
    try {
      const parsed = new URL(value);
      if (parsed.protocol !== "https:" || !parsed.hostname || parsed.username || parsed.password) {
        throw new Error("invalid secure URL");
      }
      return { external: true, canonical: parsed.href };
    } catch {
      report(location, "must be a valid HTTPS URL without credentials");
      return null;
    }
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    report(location, "only local paths and HTTPS URLs are supported");
    return null;
  }

  const pathOnly = value.split(/[?#]/, 1)[0];
  if (!pathOnly) {
    report(location, "must include a local path before any query or fragment");
    return null;
  }
  if (/%2f|%5c/i.test(pathOnly)) {
    report(location, "encoded path separators are not allowed");
    return null;
  }

  let rootRelative = pathOnly.startsWith("/") ? pathOnly.slice(1) : pathOnly;
  rootRelative = rootRelative.replace(/^(?:\.\/)+/, "");
  if (!rootRelative) {
    report(location, "must resolve to a file or project folder");
    return null;
  }

  let decoded;
  try {
    decoded = decodeURIComponent(rootRelative);
  } catch {
    report(location, "contains malformed percent encoding");
    return null;
  }
  if (decoded.includes("\0")) {
    report(location, "NUL bytes are not allowed");
    return null;
  }
  const segments = decoded.split("/").filter((segment, index, all) => segment !== "" || index === all.length - 1);
  const pathSegments = segments.filter(Boolean);
  if (pathSegments.some((segment) => segment === "." || segment === "..")) {
    report(location, "path traversal is not allowed");
    return null;
  }
  const resolved = path.resolve(repositoryRoot, ...pathSegments);
  if (resolved !== repositoryRoot && !resolved.startsWith(repositoryRoot + path.sep)) {
    report(location, "path resolves outside the repository");
    return null;
  }
  return {
    external: false,
    canonical: pathSegments.join("/"),
    resolved,
    pathOnly,
    trailingSlash: pathOnly.endsWith("/")
  };
}

async function hasExactCase(segments) {
  let parent = repositoryRoot;
  for (const segment of segments) {
    const entries = await fs.readdir(parent);
    if (!entries.includes(segment)) return false;
    parent = path.join(parent, segment);
  }
  return true;
}

async function validateLocalTarget(result, field, location) {
  if (!result || result.external) return;
  const segments = result.canonical.split("/").filter(Boolean);
  try {
    if (!(await hasExactCase(segments))) {
      report(location, "filename casing does not match the repository");
      return;
    }
    const realTarget = await fs.realpath(result.resolved);
    if (realTarget !== repositoryRoot && !realTarget.startsWith(repositoryRoot + path.sep)) {
      report(location, "symlink resolves outside the repository");
      return;
    }
    const targetStat = await fs.stat(result.resolved);
    if (field === "href") {
      if (targetStat.isDirectory()) {
        if (!result.trailingSlash) report(location, "directory links must end in /");
        const indexPath = path.join(result.resolved, "index.html");
        const indexReal = await fs.realpath(indexPath);
        if (!indexReal.startsWith(repositoryRoot + path.sep) || !(await fs.stat(indexPath)).isFile()) throw new Error("missing index");
        if (!(await hasExactCase([...segments, "index.html"]))) report(location, "directory index.html casing does not match");
      } else if (!targetStat.isFile() || path.extname(result.resolved).toLowerCase() !== ".html") {
        report(location, "must point to an HTML file or a folder with index.html");
      }
    } else if (!targetStat.isFile() || !imageExtensions.has(path.extname(result.resolved).toLowerCase())) {
      report(location, "must point to a supported image file");
    }
  } catch {
    report(location, "local target does not exist or cannot be read");
  }
}

let raw;
let data;
try {
  raw = await fs.readFile(cataloguePath, "utf8");
  data = parseCatalogue(raw, cataloguePath);
} catch (error) {
  console.error(`${catalogueLabel}: ${error.message}`);
  process.exitCode = 1;
  process.exit();
}

if (!isPlainObject(data)) {
  report("catalogue", "root must be an object");
} else {
  validateExactKeys(data, allowedRootKeys, "catalogue");
  if (data.version !== 1) report("catalogue.version", "must be the number 1");
  if (!Array.isArray(data.items)) {
    report("catalogue.items", "must be an array");
  } else {
    const ids = new Set();
    const hrefs = new Set();
    for (const [index, item] of data.items.entries()) {
      const location = `catalogue.items[${index}]`;
      if (!isPlainObject(item)) {
        report(location, "must be an object");
        continue;
      }
      validateExactKeys(item, allowedItemKeys, location);
      requiredItemKeys.forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(item, key)) report(`${location}.${key}`, "is required");
      });
      if (validateText(item.id, `${location}.id`)) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) report(`${location}.id`, "must use lowercase kebab-case");
        if (ids.has(item.id)) report(`${location}.id`, "duplicates another id");
        ids.add(item.id);
      }
      validateText(item.title, `${location}.title`);
      validateText(item.summary, `${location}.summary`);
      if (item.kind !== "game" && item.kind !== "app") report(`${location}.kind`, "must be game or app");
      if (item.hidden !== undefined && typeof item.hidden !== "boolean") report(`${location}.hidden`, "must be a boolean");
      if (item.badge !== undefined) validateText(item.badge, `${location}.badge`);
      if (item.accent !== undefined && (typeof item.accent !== "string" || !/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(item.accent))) report(`${location}.accent`, "must be a 3, 4, 6 or 8 digit CSS hex color");
      if (item.platforms !== undefined) {
        if (!Array.isArray(item.platforms) || item.platforms.length === 0) {
          report(`${location}.platforms`, "must be a non-empty array");
        } else {
          const platforms = new Set();
          item.platforms.forEach((platform, platformIndex) => {
            const platformLocation = `${location}.platforms[${platformIndex}]`;
            if (validateText(platform, platformLocation)) {
              const normalized = platform.toLowerCase();
              if (platforms.has(normalized)) report(platformLocation, "duplicates another platform");
              platforms.add(normalized);
            }
          });
        }
      }

      for (const field of ["href", "cover", "icon"]) {
        const result = validateUrlSyntax(item[field], `${location}.${field}`);
        if (field === "href" && result) {
          if (hrefs.has(result.canonical)) report(`${location}.href`, "duplicates another catalogue target");
          hrefs.add(result.canonical);
        }
        await validateLocalTarget(result, field, `${location}.${field}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Catalogue validation failed with ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const visible = data.items.filter((item) => item.hidden !== true).length;
  console.log(`Catalogue valid: ${data.items.length} entries (${visible} visible), display order preserved.`);
}
