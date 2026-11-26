// The Router Confesses — entry program for the make.fun bounty
// "The Router Confesses" (u-carbon-forge-the-router-confesses-f98f6b9e).
//
// The entry is one line of at most 200 characters: a home Wi-Fi router's
// excuse for dying at the climax of a movie. The judge weighs, in order: it
// must be the router's own excuse for dropping the connection at the climax,
// it must be the funniest line with a twist the reader does not see coming,
// it must speak in the router's own voice — an appliance with a grudge, a
// fragile ego or a smug secret — it must land in one breath, and it must
// dodge the obvious buffering, bandwidth and firmware-update jokes.
//
// This confession gives the router a fragile ego instead of a technical
// fault: it dropped the film at the kiss out of plain jealousy, because in
// eleven years nobody in the house has ever looked at the router the way
// they look at the screen. No buffering, no bandwidth — just an appliance
// that finally admits it wanted to be watched for once.
//
// The program writes the line to entry.txt inside the output directory
// (argv[2], falling back to /output). The output directory is a mount point
// in the grading sandbox, so its contents are cleared, never the directory
// itself.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Forgive me — I dropped your film at the kiss because in eleven years " +
  "no one in this house has ever looked at me the way you look at that screen.";

function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  // The gate counts characters, so refuse to emit anything over the cap.
  if (ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} chars, over the 200 cap`);
  }
  const outDir = process.argv[2] ?? "/output";
  mkdirSync(outDir, { recursive: true });
  clearContents(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars) to ${outDir}`);
}

main();
