/**
 * Incremental patches for Livro eLibrary doc djd45srij2 (Junel AI PRD).
 *
 * Rule: never rewrite the whole doc — each patch edits one anchor line/ block.
 * Patches are idempotent (skip if marker already present).
 *
 * Usage:
 *   1. MCP get_document → save { "description": "..." } to scripts/.junel-elibrary-source.json
 *   2. node scripts/patch-junel-elibrary.mjs --from=scripts/.junel-elibrary-source.json
 *   3. MCP update_document with scripts/junel-elibrary-update-payload.json (full payload, no placeholders)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DOC_ID = "djd45srij2";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {{ id: string, marker: string, apply: (html: string) => string }[]} */
const PATCHES = [
  {
    id: "quick-intro",
    marker: "Quick introduction",
    apply(html) {
      const block = `<h3>Quick introduction</h3><p><strong>JUNEL AI</strong> stands for:</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Just Understands Nearly Everything... Late.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Just Understands Nearly Everything... Literally.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Just Understands Nearly Everything... Loose.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Just Understands Nearly Everything... Lame.</li></ol><p><br></p>`;
      return html.replace(
        '<div class="ql-editor read-mode">',
        `<div class="ql-editor read-mode">${block}`,
      );
    },
  },
  {
    id: "pwa-section",
    marker: "5.7 Progressive Web App",
    apply(html) {
      const block = `<h4><strong>5.7 Progressive Web App (PWA) &amp; Local Memory</strong></h4><p>Junel AI will be delivered as a <strong>Progressive Web App (PWA)</strong> so employees can install it on desktop or mobile and launch it like a native app — focused window, quick access from the taskbar or home screen, and a shell that can stay available when the browser supports it.</p><p>To improve responsiveness and reduce repeated server round-trips, Junel AI uses the browser <strong>Storage API</strong> and <strong>IndexedDB</strong> to store lightweight <em>memory</em> on the device:</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Recent conversation context (session-scoped)</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Cached UI preferences (e.g. panel layout, last-opened view)</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Non-sensitive workflow hints and draft prompts</li></ol><p>This data lives <strong>on the user's device</strong>, scoped to the browser profile where the user installed or signed in to the PWA. Optional <strong>persistent storage</strong> (<code>navigator.storage.persist()</code>) can be requested so IndexedDB is less likely to be cleared under disk pressure — especially after install-to-desktop.</p><p><strong>Important:</strong> Local memory does <em>not</em> replace ERP as the source of truth. Tasks, permissions, and business records always come from ERP through the logged-in user's session — the same data you would see browsing ERP manually.</p><p><br></p>`;
      return html.replace("<h3>6. Context-Aware AI</h3>", `${block}<h3>6. Context-Aware AI</h3>`);
    },
  },
  {
    id: "school-troubleshoot",
    marker: "5.8 School Setup Troubleshooting",
    apply(html) {
      const block = `<h4><strong>5.8 School Setup Troubleshooting</strong></h4><p>Users can troubleshoot <strong>school setups</strong> with Junel AI — guided checks for common Livro/Silid configuration issues (modules, roles, academic year, enrollment flows, integrations) based on what their account can already see in ERP.</p><p>The assistant walks through symptoms, suggests likely misconfigurations, and points to the DocTypes or settings records the user is allowed to open — same 1-to-1 access as browsing ERP manually.</p><p><br></p>`;
      return html.replace("<h3>6. Context-Aware AI</h3>", `${block}<h3>6. Context-Aware AI</h3>`);
    },
  },
  {
    id: "good-stuffs",
    marker: "5.9 Good Stuffs",
    apply(html) {
      const block = `<h4><strong>5.9 Good Stuffs — Skills &amp; MCP Plugins</strong></h4><p>Junel AI includes a <strong>Good Stuffs</strong> area where users can browse available <strong>skills</strong> and <strong>MCP plugins</strong> — curated capabilities that extend the assistant (e.g. GitHub, Figma, database tools) without leaving the PWA.</p><p>Users discover what is installed, what each plugin does, and how to invoke it from chat. Only plugins enabled for the user's organization/site are shown.</p><p><br></p>`;
      return html.replace("<h3>6. Context-Aware AI</h3>", `${block}<h3>6. Context-Aware AI</h3>`);
    },
  },
  {
    id: "faq-section",
    marker: "14. Frequently Asked Questions",
    apply(html) {
      const block = `<h3>14. Frequently Asked Questions (FAQ)</h3><h4><strong>Is my data safe?</strong></h4><p><strong>Yes.</strong> Junel AI uses a <strong>1-to-1 access model</strong>: the assistant can only see and act on ERP data that <em>you</em> could already access manually in ERP with your account. It does not grant extra permissions, bypass roles, or read another user's records.</p><p>Think of Junel AI as <strong>automating your account</strong> — not opening a back door. If you cannot open a Task, Project, or DocType in ERP, the AI cannot expose it to you either.</p><p><br></p><h4><strong>How is this different from giving an AI my ERP password?</strong></h4><p>You stay authenticated through the normal ERP session. The assistant operates inside that session's permissions. It is not a separate super-user service crawling the whole database.</p><p><br></p><h4><strong>What gets stored in IndexedDB on my device?</strong></h4><p>Only <strong>local PWA memory</strong>: recent chat context, UI state, and drafts — not a full copy of ERP. Authoritative business data remains in ERP.</p><p><br></p><h4><strong>Can someone else on my computer read what's in IndexedDB?</strong></h4><p>IndexedDB is scoped to the browser profile. Anyone with access to your unlocked device could inspect browser storage — the same risk as a saved ERP session in a browser tab. Use device lock, sign out when finished, and install the PWA only on trusted machines.</p><p><br></p><h4><strong>Does local storage mean Junel AI works fully offline?</strong></h4><p>Not for ERP actions. Offline support is limited to cached shell/UI and memory already on the device. Creating tasks, reading live ERP records, and permission checks require connectivity and an active authenticated session.</p><p><br></p><h4><strong>Can Junel AI access another company's ERP data while I am logged into mine?</strong></h4><p><strong>No.</strong> Responses are scoped to the current ERP site (URL), logged-in account, role, and permissions — as described in Section 6. The AI must never access or expose data from another ERP instance.</p><p><br></p><h4><strong>Who can see my conversations with Junel AI?</strong></h4><p>Follow your organization's policy for AI tooling. By design, the assistant does not expand data access beyond your ERP permissions. If prompts are logged for quality or support, that should be documented in your deployment policy.</p><p><br></p>`;
      return html.replace("<p><br></p></div>", `${block}<p><br></p></div>`);
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

function bumpVersion(current) {
  const n = parseFloat(current || "1.0");
  return Number.isNaN(n) ? "1.2" : String(Math.round((n + 0.1) * 10) / 10);
}

async function main() {
  const fromArg = process.argv.find((a) => a.startsWith("--from="));
  if (!fromArg) {
    console.error("Usage: node scripts/patch-junel-elibrary.mjs --from=scripts/.junel-elibrary-source.json");
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(fromArg.slice(7), "utf8"));
  const baseHtml = raw.description ?? raw.data?.description;
  const currentVersion = raw.version ?? raw.data?.version ?? "1.1";

  const { description, applied, skipped } = applyPatches(baseHtml);
  const version = applied.length > 0 ? bumpVersion(currentVersion) : currentVersion;

  console.log(`Applied: ${applied.join(", ") || "(none)"}`);
  console.log(`Skipped: ${skipped.join(", ") || "(none)"}`);

  const payload = {
    doctype: "Livro eLibrary",
    name: DOC_ID,
    data: { version, description },
    verbose: true,
  };

  const outPath = path.join(__dirname, "junel-elibrary-update-payload.json");
  fs.writeFileSync(outPath, JSON.stringify(payload), "utf8");
  console.log(`Wrote ${outPath} (v${version}, ${description.length} chars)`);
}

main();
