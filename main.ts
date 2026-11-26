// "The Only Thing Allowed to Grow" — entry for
// u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a.
//
// A tiny, dependency-free Node 22 program. It holds the single office joke,
// checks it against the competition gate (1 to 199 Unicode code points,
// one line, never blank, no trailing whitespace, no control characters and
// no invisible formatting characters), writes it byte-exact with no
// trailing newline to entry.txt inside the harness output directory, and
// re-reads the file to prove the bytes survived the round trip.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The joke, exactly as it will be judged: ask HR for a raise, get a plant
// instead — and the punchline lands on the plant being the only thing in
// the office that is actually allowed to grow.
const LINE =
  "I asked HR for a raise and they gave me a plant — turns out it's the only thing in this office that's allowed to grow.";

const GATE_MIN = 1;
const GATE_MAX = 199;

/** Enforce the gate: one line, length counted in code points, not blank. */
function assertValid(line: string): number {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("joke must stay on a single line");
  }
  if (/\s{2,}/.test(line)) {
    throw new Error("joke must not contain double spaces");
  }
  if (line.trim() !== line) {
    throw new Error("joke must not start or end with whitespace");
  }
  if (line.trim().length === 0) {
    throw new Error("joke must not be blank");
  }
  for (const ch of line) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) {
      throw new Error("joke must not contain control characters");
    }
    if (code === 0xfeff || (code >= 0x200b && code <= 0x200f)) {
      throw new Error("joke must not contain invisible formatting characters");
    }
  }
  const count = Array.from(line).length;
  if (count < GATE_MIN || count > GATE_MAX) {
    throw new Error(
      `joke must be ${GATE_MIN}-${GATE_MAX} characters, got ${count}`,
    );
  }
  return count;
}

function main(): void {
  const count = assertValid(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const target = resolve(join(outDir, "entry.txt"));
  mkdirSync(outDir, { recursive: true });
  // Byte-exact write: UTF-8, no trailing newline, nothing else.
  writeFileSync(target, LINE, "utf8");
  // Re-read and verify the round trip byte for byte.
  const roundTrip = readFileSync(target, "utf8");
  if (roundTrip !== LINE) {
    throw new Error("entry.txt did not survive the round trip byte-exact");
  }
  const bytes = Buffer.byteLength(roundTrip, "utf8");
  if (roundTrip.endsWith("\n")) {
    throw new Error("entry.txt must not end with a newline");
  }
  console.log(`wrote ${target} (${count} characters, ${bytes} bytes)`);
}

main();
