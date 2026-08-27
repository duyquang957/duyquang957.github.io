#!/usr/bin/env node

import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const validator = path.join(toolsDirectory, "validate-catalog.mjs");
const temporaryDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "playluma-catalog-tests-"));

const baseItem = {
  id: "test-entry",
  title: "Test Entry",
  kind: "app",
  href: "AnatomyView.html",
  summary: "A validator fixture.",
  cover: "images/generated/anatomy-view-hero.png",
  icon: "images/AnatomyView/app_logo.png"
};

const cases = [
  { name: "valid minimal item", data: { version: 1, items: [baseItem] }, valid: true },
  { name: "valid JavaScript catalogue wrapper", data: { version: 1, items: [baseItem] }, format: "script", valid: true },
  { name: "valid hidden item", data: { version: 1, items: [{ ...baseItem, hidden: true }] }, valid: true },
  { name: "valid HTTPS item", data: { version: 1, items: [{ ...baseItem, href: "https://example.com/app", cover: "https://example.com/cover.webp", icon: "https://example.com/icon.png" }] }, valid: true },
  { name: "valid local query and fragment", data: { version: 1, items: [{ ...baseItem, href: "AnatomyView.html#learn", icon: "images/AnatomyView/app_logo.png?v=1" }] }, valid: true },
  { name: "malformed JSON", raw: "{broken", valid: false },
  { name: "missing JavaScript catalogue wrapper", raw: JSON.stringify({ version: 1, items: [baseItem] }), format: "script", valid: false },
  { name: "duplicate id", data: { version: 1, items: [baseItem, { ...baseItem, href: "ForgottenRules.html" }] }, valid: false },
  { name: "duplicate target", data: { version: 1, items: [baseItem, { ...baseItem, id: "another-entry" }] }, valid: false },
  { name: "unsupported kind", data: { version: 1, items: [{ ...baseItem, kind: "tool" }] }, valid: false },
  { name: "unsafe URL", data: { version: 1, items: [{ ...baseItem, href: "javascript:alert(1)" }] }, valid: false },
  { name: "missing local asset", data: { version: 1, items: [{ ...baseItem, cover: "images/not-present.png" }] }, valid: false },
  { name: "wrong filename casing", data: { version: 1, items: [{ ...baseItem, icon: "images/anatomyview/app_logo.png" }] }, valid: false },
  { name: "unknown item key", data: { version: 1, items: [{ ...baseItem, typo: true }] }, valid: false }
];

let failures = 0;
try {
  for (const [index, testCase] of cases.entries()) {
    const fixturePath = path.join(temporaryDirectory, `${index}.${testCase.format === "script" ? "js" : "json"}`);
    const json = JSON.stringify(testCase.data, null, 2);
    const source = testCase.raw ?? (testCase.format === "script" ? `window.PLAYLUMA_CATALOG = ${json};\n` : json);
    await fs.writeFile(fixturePath, source, "utf8");
    const result = spawnSync(process.execPath, [validator, fixturePath], { encoding: "utf8" });
    const passed = testCase.valid ? result.status === 0 : result.status !== 0;
    if (!passed) failures += 1;
    console.log(`${passed ? "PASS" : "FAIL"} ${testCase.name}`);
    if (!passed) process.stdout.write(result.stdout + result.stderr);
  }
} finally {
  await fs.rm(temporaryDirectory, { recursive: true, force: true });
}

if (failures) {
  console.error(`${failures} validator test${failures === 1 ? "" : "s"} failed.`);
  process.exitCode = 1;
} else {
  console.log(`All ${cases.length} validator tests passed.`);
}
