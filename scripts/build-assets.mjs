// Generates the README's SVG assets (light and dark variants).
// Run: node scripts/build-assets.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");
mkdirSync(out, { recursive: true });

const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif`;
const MONO = `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`;

const themes = {
  dark: {
    bg: "#0d1117", panel: "#161b22", border: "#30363d", text: "#e6edf3",
    muted: "#8b949e", accent: "#58a6ff", accent2: "#a371f7", chip: "#21262d", glow: 0.35,
  },
  light: {
    bg: "#ffffff", panel: "#f6f8fa", border: "#d0d7de", text: "#1f2328",
    muted: "#59636e", accent: "#0969da", accent2: "#8250df", chip: "#eaeef2", glow: 0.18,
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Greedy word wrap using an average glyph width estimate.
function wrap(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if ((line + " " + word).trim().length > maxChars) { lines.push(line); line = word; }
    else line = (line + " " + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function hero(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="260" viewBox="0 0 900 260" role="img" aria-label="Aashif Ahamed, full-stack developer">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.accent}"/><stop offset="1" stop-color="${t.accent2}"/>
    </linearGradient>
    <radialGradient id="orb1"><stop offset="0" stop-color="${t.accent}" stop-opacity="${t.glow}"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>
    <radialGradient id="orb2"><stop offset="0" stop-color="${t.accent2}" stop-opacity="${t.glow}"/><stop offset="1" stop-color="${t.accent2}" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="${t.border}" stroke-width="0.6" opacity="0.55"/>
    </pattern>
    <clipPath id="clip"><rect width="900" height="260" rx="16"/></clipPath>
    <style>
      .orb { animation: drift 14s ease-in-out infinite alternate; }
      .orb2 { animation: drift2 18s ease-in-out infinite alternate; }
      .cursor { animation: blink 1.1s steps(1) infinite; }
      .dot { animation: pulse 2.4s ease-in-out infinite; transform-origin: 668px 214px; }
      @keyframes drift { to { transform: translate(-90px, 40px); } }
      @keyframes drift2 { to { transform: translate(80px, -30px); } }
      @keyframes blink { 50% { opacity: 0; } }
      @keyframes pulse { 50% { opacity: 0.35; } }
      @media (prefers-reduced-motion: reduce) { .orb, .orb2, .cursor, .dot { animation: none; } }
    </style>
  </defs>
  <g clip-path="url(#clip)">
    <rect width="900" height="260" fill="${t.bg}"/>
    <rect width="900" height="260" fill="url(#grid)"/>
    <circle class="orb" cx="760" cy="60" r="220" fill="url(#orb1)"/>
    <circle class="orb2" cx="120" cy="250" r="200" fill="url(#orb2)"/>
  </g>
  <rect x="0.5" y="0.5" width="899" height="259" rx="16" fill="none" stroke="${t.border}"/>

  <text x="56" y="78" font-family="${MONO}" font-size="15" fill="${t.muted}">~/aashifahd <tspan fill="${t.accent}">$</tspan> whoami<tspan class="cursor" fill="${t.accent}">▍</tspan></text>
  <text x="54" y="138" font-family="${FONT}" font-size="50" font-weight="800" fill="${t.text}" letter-spacing="-1.5">Aashif Ahamed</text>
  <text x="56" y="176" font-family="${FONT}" font-size="20" fill="${t.muted}">Full-stack developer building <tspan fill="url(#g)" font-weight="700">SaaS, AI agents</tspan> and <tspan fill="url(#g)" font-weight="700">dev tools</tspan></text>

  <g font-family="${MONO}" font-size="13">
    <rect x="56" y="198" width="184" height="30" rx="15" fill="${t.chip}" stroke="${t.border}"/>
    <text x="148" y="218" text-anchor="middle" fill="${t.text}">Founder, CenoDigital</text>
    <rect x="250" y="198" width="110" height="30" rx="15" fill="${t.chip}" stroke="${t.border}"/>
    <text x="305" y="218" text-anchor="middle" fill="${t.text}">Sri Lanka</text>
    <rect x="370" y="198" width="214" height="30" rx="15" fill="${t.chip}" stroke="${t.border}"/>
    <text x="477" y="218" text-anchor="middle" fill="${t.text}">TypeScript · PHP · Python</text>
  </g>

  <g>
    <rect x="652" y="198" width="196" height="30" rx="15" fill="${t.chip}" stroke="${t.border}"/>
    <circle class="dot" cx="668" cy="213" r="5" fill="#3fb950"/>
    <text x="682" y="218" font-family="${MONO}" font-size="13" fill="${t.text}">Open to new projects</text>
  </g>
</svg>
`;
}

const projects = [
  {
    slug: "devplus", icon: "◆", name: "DevPlus", tag: "Open source",
    desc: "Desktop client for 12 SQL and NoSQL databases. Safe inline editing, query editor, ER diagrams and a bring-your-own-key AI assistant.",
    stack: ["Electron", "React", "TypeScript"],
  },
  {
    slug: "agencyos", icon: "◎", name: "AgencyOS", tag: "Open source",
    desc: "Eight LangGraph agents that take an agency lead from intake to a QA-checked proposal, with a live agent timeline.",
    stack: ["LangGraph", "FastAPI", "Next.js"],
  },
  {
    slug: "bizchat", icon: "◐", name: "BizChat AI", tag: "SaaS",
    desc: "Multi-tenant RAG chatbot platform. Hybrid search with reranking, streaming answers and a 15 KB embeddable widget.",
    stack: ["Qdrant", "Python", "Postgres"],
  },
  {
    slug: "leadscout", icon: "◈", name: "LeadScout", tag: "Desktop app",
    desc: "Finds businesses on Google Maps, audits their websites, scores opportunities and drafts outreach. Local first.",
    stack: ["Playwright", "React", "SQLite"],
  },
];

function card(p, t) {
  const W = 430, H = 180;
  const lines = wrap(p.desc, 62).slice(0, 3);
  let x = 24;
  const chips = p.stack.map((s) => {
    const w = s.length * 7.4 + 22;
    const el = `<rect x="${x}" y="${H - 42}" width="${w}" height="24" rx="12" fill="${t.chip}" stroke="${t.border}"/><text x="${x + w / 2}" y="${H - 25.5}" text-anchor="middle">${esc(s)}</text>`;
    x += w + 8;
    return el;
  }).join("");
  const tagW = p.tag.length * 6.8 + 20;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.name)}: ${esc(p.desc)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.accent}"/><stop offset="1" stop-color="${t.accent2}"/></linearGradient>
    <radialGradient id="glow" cx="1" cy="0" r="1"><stop offset="0" stop-color="${t.accent2}" stop-opacity="${t.glow * 0.6}"/><stop offset="0.6" stop-color="${t.accent2}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="${t.panel}" stroke="${t.border}"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="url(#glow)"/>
  <rect x="24" y="0.5" width="64" height="3" rx="1.5" fill="url(#g)"/>
  <text x="24" y="44" font-family="${FONT}" font-size="20" font-weight="700" fill="${t.text}"><tspan fill="url(#g)">${p.icon}</tspan>  ${esc(p.name)}</text>
  <rect x="${W - 24 - tagW}" y="26" width="${tagW}" height="22" rx="11" fill="none" stroke="${t.border}"/>
  <text x="${W - 24 - tagW / 2}" y="41" text-anchor="middle" font-family="${MONO}" font-size="11.5" fill="${t.muted}">${esc(p.tag)}</text>
  <text font-family="${FONT}" font-size="13.5" fill="${t.muted}">${lines.map((l, i) => `<tspan x="24" y="${76 + i * 20}">${esc(l)}</tspan>`).join("")}</text>
  <g font-family="${MONO}" font-size="11.5" fill="${t.text}">${chips}</g>
  <text x="${W - 24}" y="${H - 25.5}" text-anchor="end" font-family="${FONT}" font-size="16" fill="${t.accent}">↗</text>
</svg>
`;
}

for (const [mode, t] of Object.entries(themes)) {
  writeFileSync(join(out, `hero-${mode}.svg`), hero(t));
  for (const p of projects) writeFileSync(join(out, `${p.slug}-${mode}.svg`), card(p, t));
}
console.log("assets written to", out);
