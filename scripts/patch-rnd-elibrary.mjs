/**
 * Incremental patches for Livro eLibrary doc 0ajees6jce (How RND Cook Next JS).
 * v6 → v7: npm/npx → bun/bunx
 *
 * Rule: never rewrite the whole doc — each patch edits targeted strings.
 * Patches are idempotent (skip if marker already present).
 *
 * Usage:
 *   1. MCP get_document → save { "description", "version" } to scripts/.rnd-elibrary-source.json
 *   2. node scripts/patch-rnd-elibrary.mjs --from=scripts/.rnd-elibrary-source.json
 *   3. MCP update_document with scripts/rnd-elibrary-update-payload.json (full payload, no placeholders)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DOC_ID = "0ajees6jce";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {{ id: string, marker: string, apply: (html: string) => string }[]} */
const PATCHES = [
  {
    id: "bun-prerequisites",
    marker: "npm install -g bun",
    apply(html) {
      return html.replace(
        '<li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Node.js</strong> 20+</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Docker</strong>',
        '<li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Bun</strong> — install: <code>npm install -g bun</code>; upgrade: <code>bun upgrade</code></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Docker</strong>',
      );
    },
  },
  {
    id: "bun-install",
    marker: 'data-language="plain">bun install</div>',
    apply(html) {
      return html.replaceAll(
        '<div class="ql-code-block" data-language="plain">npm install</div>',
        '<div class="ql-code-block" data-language="plain">bun install</div>',
      );
    },
  },
  {
    id: "bun-run-migrate",
    marker: 'data-language="plain">bun run db:migrate</div>',
    apply(html) {
      let h = html;
      h = h.replaceAll(
        '<div class="ql-code-block" data-language="plain">npm run db:migrate</div>',
        '<div class="ql-code-block" data-language="plain">bun run db:migrate</div>',
      );
      h = h.replaceAll("npm run db:migrate", "bun run db:migrate");
      return h;
    },
  },
  {
    id: "bun-run-dev",
    marker: 'data-language="plain">bun run dev</div>',
    apply(html) {
      let h = html;
      h = h.replaceAll(
        '<div class="ql-code-block" data-language="plain">npm run dev</div>',
        '<div class="ql-code-block" data-language="plain">bun run dev</div>',
      );
      h = h.replaceAll("npm run dev", "bun run dev");
      return h;
    },
  },
  {
    id: "bun-run-generate",
    marker: "bun run db:generate",
    apply(html) {
      return html.replaceAll("npm run db:generate", "bun run db:generate");
    },
  },
  {
    id: "bun-migrate-script",
    marker: "bun scripts/migrate.mts",
    apply(html) {
      return html.replaceAll("npx tsx scripts/migrate.mts", "bun scripts/migrate.mts");
    },
  },
  {
    id: "bunx-web-push",
    marker: "bunx web-push generate-vapid-keys",
    apply(html) {
      return html.replaceAll(
        "npx web-push generate-vapid-keys",
        "bunx web-push generate-vapid-keys",
      );
    },
  },
  {
    id: "bunx-next-https",
    marker: "bunx next dev --experimental-https",
    apply(html) {
      return html.replaceAll(
        "npx next dev --experimental-https",
        "bunx next dev --experimental-https",
      );
    },
  },
  {
    id: "version-bump",
    marker: "<strong>Version:</strong> 7</p>",
    apply(html) {
      return html.replace("<strong>Version:</strong> 6</p>", "<strong>Version:</strong> 7</p>");
    },
  },
];

function applyPatches(html) {
  let result = html;
  const applied = [];
  const skipped = [];

  for (const patch of PATCHES) {
    if (result.includes(patch.marker)) {
      skipped.push(patch.id);
      continue;
    }
    const next = patch.apply(result);
    if (next === result) {
      console.warn(`  warn: patch "${patch.id}" made no change (anchor missing?)`);
      skipped.push(patch.id);
    } else {
      result = next;
      applied.push(patch.id);
    }
  }

  return { description: result, applied, skipped };
}

async function main() {
  const fromArg = process.argv.find((a) => a.startsWith("--from="));
  if (!fromArg) {
    console.error("Usage: node scripts/patch-rnd-elibrary.mjs --from=scripts/.rnd-elibrary-source.json");
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(fromArg.slice(7), "utf8"));
  const baseHtml = raw.description ?? raw.data?.description;
  const currentVersion = raw.version ?? raw.data?.version ?? "6";

  const { description, applied, skipped } = applyPatches(baseHtml);
  const version = applied.length > 0 ? "7" : String(currentVersion);

  console.log(`Applied: ${applied.join(", ") || "(none)"}`);
  console.log(`Skipped: ${skipped.join(", ") || "(none)"}`);

  const payload = {
    doctype: "Livro eLibrary",
    name: DOC_ID,
    data: { version, description },
    verbose: true,
  };

  const outPath = path.join(__dirname, "rnd-elibrary-update-payload.json");
  fs.writeFileSync(outPath, JSON.stringify(payload), "utf8");
  console.log(`Wrote ${outPath} (v${version}, ${description.length} chars)`);
}

main();
