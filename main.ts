// Fortune Cookie Funnies for Engineers — deterministic one-line entry.
// Writes exactly one fortune-cookie line to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt). Stdlib only, no network, no randomness.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Your pull request will be approved in four minutes by a reviewer who read none of it.";

function main(): void {
  if (LINE.length === 0) {
    throw new Error("fortune line is empty");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("fortune line must be a single line");
  }
  if (LINE.length > 120) {
    throw new Error(`fortune line is ${LINE.length} chars, over the 120 limit`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("fortune line is only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  // Read back and confirm the file holds exactly the guarded line.
  if (readFileSync(outPath, "utf8") !== LINE) {
    throw new Error("entry.txt does not match the fortune line");
  }
}

main();
