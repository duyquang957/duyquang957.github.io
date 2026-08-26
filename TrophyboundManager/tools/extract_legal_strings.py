#!/usr/bin/env python3
"""Extract the ordered translatable HTML fragments used by legal-i18n.js."""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path


VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


@dataclass
class Capture:
    tag: str
    depth: int
    parts: list[str] = field(default_factory=list)
    value: str | None = None


class LegalStringParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.stack: list[tuple[str, set[str]]] = []
        self.legal_article_depth: int | None = None
        self.captures: list[Capture] = []
        self.active_captures: list[Capture] = []

    def _has_ancestor_class(self, class_name: str) -> bool:
        return any(class_name in classes for _, classes in self.stack)

    def _parent_has_class(self, class_name: str) -> bool:
        return bool(self.stack and class_name in self.stack[-1][1])

    def _is_target(self, tag: str, classes: set[str]) -> bool:
        if self.legal_article_depth is None:
            return False
        if tag in {"p", "h1", "h2", "h3"}:
            return True
        if tag == "strong" and self._parent_has_class("legal-toc"):
            return True
        if tag == "li" and (self._has_ancestor_class("legal-toc") or self._has_ancestor_class("legal-sections")):
            return True
        if tag == "a" and self._has_ancestor_class("legal-inline-nav"):
            return True
        if tag == "a" and "button" in classes and self._parent_has_class("legal-request-card"):
            return True
        return False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        classes = set(dict(attrs).get("class", "").split())
        raw = self.get_starttag_text()
        for capture in self.active_captures:
            capture.parts.append(raw)

        if self._is_target(tag, classes):
            capture = Capture(tag=tag, depth=len(self.stack))
            self.captures.append(capture)
            self.active_captures.append(capture)

        if tag == "article" and "legal-document" in classes:
            self.legal_article_depth = len(self.stack)
        if tag not in VOID_TAGS:
            self.stack.append((tag, classes))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        raw = self.get_starttag_text()
        for capture in self.active_captures:
            capture.parts.append(raw)

    def handle_endtag(self, tag: str) -> None:
        closing_depth = len(self.stack) - 1
        for capture in list(self.active_captures):
            if capture.tag == tag and capture.depth == closing_depth:
                capture.value = re.sub(r"\s+", " ", "".join(capture.parts)).strip()
                self.active_captures.remove(capture)
            else:
                capture.parts.append(f"</{tag}>")

        if self.stack:
            ended_tag, ended_classes = self.stack.pop()
            if (
                ended_tag == "article"
                and "legal-document" in ended_classes
                and self.legal_article_depth == closing_depth
            ):
                self.legal_article_depth = None

    def handle_data(self, data: str) -> None:
        for capture in self.active_captures:
            capture.parts.append(data)

    def handle_entityref(self, name: str) -> None:
        for capture in self.active_captures:
            capture.parts.append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        for capture in self.active_captures:
            capture.parts.append(f"&#{name};")

    @property
    def strings(self) -> list[str]:
        unfinished = [capture for capture in self.captures if capture.value is None]
        if unfinished:
            raise ValueError(f"Unclosed translatable elements: {[capture.tag for capture in unfinished]}")
        return [capture.value or "" for capture in self.captures]


def extract(path: Path) -> list[str]:
    parser = LegalStringParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser.strings


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--web-root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    pages = {
        "privacy": args.web_root / "privacy-policy.html",
        "terms": args.web_root / "terms.html",
        "deletion": args.web_root / "account-deletion.html",
    }
    payload = {page: extract(path) for page, path in pages.items()}
    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
