#!/usr/bin/env node
"use strict";

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const webRoot = path.resolve(__dirname, "..");
const localeRoot = path.join(webRoot, "assets", "js", "legal-locales");
const expectedLocales = [
  "vi", "en-SG", "ja", "ko", "es", "de", "fr", "it", "pt-BR", "pt-PT", "id-ID", "hi-IN", "th", "ar",
];
const english = JSON.parse(execFileSync("python3", [path.join(__dirname, "extract_legal_strings.py")], { encoding: "utf8" }));
const errors = [];
const warnings = [];

function markupSignature(value) {
  return (String(value).match(/<\/?[a-z][^>]*>/gi) ?? []).join("|");
}

function validateLocale(locale) {
  const file = path.join(localeRoot, `${locale}.js`);
  if (!fs.existsSync(file)) {
    errors.push(`${locale}: missing ${path.relative(webRoot, file)}`);
    return;
  }

  const context = { window: {} };
  try {
    vm.runInNewContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  } catch (error) {
    errors.push(`${locale}: JavaScript error: ${error.message}`);
    return;
  }

  const translation = context.window.TROPHYBOUND_LEGAL_TRANSLATIONS?.[locale];
  if (!translation) {
    errors.push(`${locale}: file did not register the expected locale`);
    return;
  }

  for (const pageId of ["privacy", "terms", "deletion"]) {
    const page = translation.pages?.[pageId];
    if (!page) {
      errors.push(`${locale}/${pageId}: missing page object`);
      continue;
    }
    if (!page.meta?.title?.trim() || !page.meta?.description?.trim()) {
      errors.push(`${locale}/${pageId}: title and description are required`);
    }
    if (!Array.isArray(page.strings)) {
      errors.push(`${locale}/${pageId}: strings must be an array`);
      continue;
    }
    if (page.strings.length !== english[pageId].length) {
      errors.push(`${locale}/${pageId}: found ${page.strings.length} strings, expected ${english[pageId].length}`);
      continue;
    }
    page.strings.forEach((value, index) => {
      if (typeof value !== "string" || !value.trim()) {
        errors.push(`${locale}/${pageId}[${index}]: empty or non-string value`);
        return;
      }
      if (markupSignature(value) !== markupSignature(english[pageId][index])) {
        errors.push(`${locale}/${pageId}[${index}]: inline HTML or link attributes differ from the English source`);
      }
      if (value.includes("[[") || /\bTODO\b/.test(value) || /javascript:/i.test(value)) {
        errors.push(`${locale}/${pageId}[${index}]: contains a placeholder or unsafe URL`);
      }
      if (locale !== "en-SG" && value === english[pageId][index] && value.replace(/<[^>]+>/g, "").trim().split(/\s+/).length >= 6) {
        warnings.push(`${locale}/${pageId}[${index}]: long value is still identical to English`);
      }
    });
  }
}

expectedLocales.forEach(validateLocale);

if (warnings.length) {
  console.warn(`Warnings (${warnings.length}):\n${warnings.join("\n")}`);
}
if (errors.length) {
  console.error(`Errors (${errors.length}):\n${errors.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${expectedLocales.length} locales across 3 legal pages (${Object.values(english).reduce((sum, values) => sum + values.length, 0)} strings per locale).`);
}
