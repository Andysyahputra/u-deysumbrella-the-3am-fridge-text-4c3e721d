// The 3AM Fridge Text — entry program (v2).
// The fridge snitches to the scale. Writes its one-line 3AM text
// message to /output/entry.txt, after validating it meets the gate:
// UTF-8, a single line, 1-140 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

function buildEntry(): string {
  const parts = [
    "It's 3AM.",
    "I counted your midnight snacks.",
    "There were four.",
    "I told the scale.",
  ];
  return parts.join(" ");
}

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const length = [...text].length;
  if (length < 1 || length > 140) {
    throw new Error(`entry length ${length} is outside 1-140 characters`);
  }
}

const entry = buildEntry();
validateEntry(entry);

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, entry, "utf8");
