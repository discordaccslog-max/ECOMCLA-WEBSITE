// Generates clean placeholder imagery into /public. Run with:
//   node scripts/generate-placeholders.mjs
// Listing screenshots: /public/listings/<slug>/{storefront,analytics,ads}.svg
// People: /public/people/<name>.svg (monograms, not photos of real people)
// Swap these for real imagery by replacing the files (same names) or by
// changing the paths in /src/data. See README, "Imagery".

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const listings = [
  { slug: "haven-pet-co", name: "Haven Pet Co.", hue: 28, line: "Orthopedic beds for every dog", rev: [62, 65, 71, 70, 76, 75, 66, 78, 85, 87, 89, 97, 97, 99] },
  { slug: "lumen-skin-studio", name: "Lumen Skin Studio", hue: 330, line: "Clinic-grade light, at home", rev: [99, 99, 105, 104, 107, 115, 121, 118, 119, 121, 130, 108, 140, 136, 142, 145, 153, 154] },
  { slug: "driftline-outdoors", name: "Driftline Outdoors", hue: 150, line: "Pack lighter. Go further.", rev: [72, 73, 87, 89, 86, 72, 70, 75, 52, 48, 70, 69] },
  { slug: "nest-and-nook", name: "Nest & Nook", hue: 200, line: "Room for everything", rev: [29, 32, 37, 40, 45] },
  { slug: "kinetic-recovery", name: "Kinetic Recovery", hue: 12, line: "Recover like a pro", rev: [129, 126, 124, 123, 125, 121, 124, 122, 117, 122, 118, 117, 113, 103, 98, 100] },
  { slug: "little-lark", name: "Little Lark", hue: 48, line: "Mealtimes, made calmer", rev: [37, 41, 45, 47, 55, 59] },
  { slug: "brewcraft-supply", name: "Brewcraft Supply", hue: 30, line: "Better coffee at home", rev: [63, 64, 66, 66, 68, 68, 69, 74, 74, 63, 78, 80, 81, 80, 82] },
  { slug: "ember-kitchen", name: "Ember Kitchen", hue: 8, line: "Cast iron, cared for", rev: [32, 36, 36, 43, 47] },
  { slug: "ridgeway-auto", name: "Ridgeway Auto", hue: 220, line: "Every drive, organised", rev: [72, 75, 77, 74, 65, 69, 81, 83, 83, 82, 86, 86, 90] },
];

const people = [
  { file: "daniel-okafor", initials: "DO", w: 480, h: 600, hue: 210 },
  { file: "mara-lindqvist", initials: "ML", w: 480, h: 600, hue: 160 },
  { file: "priya-raman", initials: "PR", w: 480, h: 600, hue: 30 },
  { file: "marcus-bell", initials: "MB", w: 160, h: 160, hue: 220 },
  { file: "aisha-khan", initials: "AK", w: 160, h: 160, hue: 20 },
  { file: "daniel-reyes", initials: "DR", w: 160, h: 160, hue: 8 },
  { file: "hannah-okoro", initials: "HO", w: 160, h: 160, hue: 140 },
];

const W = 1600;
const H = 1000;
const font = "font-family='Inter, Helvetica, Arial, sans-serif'";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function write(path, svg) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, svg.replace(/\n\s+/g, "\n"));
}

function chrome(title, body, bg = "#f6f5f2") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#1b1d22"/>
  <rect x="0" y="0" width="${W}" height="56" fill="#24272d"/>
  <circle cx="32" cy="28" r="7" fill="#4a4e57"/><circle cx="56" cy="28" r="7" fill="#4a4e57"/><circle cx="80" cy="28" r="7" fill="#4a4e57"/>
  <rect x="420" y="14" width="760" height="28" rx="14" fill="#1b1d22"/>
  <text x="800" y="33" text-anchor="middle" ${font} font-size="14" fill="#8a8f99">${title}</text>
  <rect x="0" y="56" width="${W}" height="${H - 56}" fill="${bg}"/>
  ${body}
</svg>`;
}

function storefront(l) {
  const c = `hsl(${l.hue} 45% 42%)`;
  const soft = `hsl(${l.hue} 40% 88%)`;
  const softer = `hsl(${l.hue} 35% 94%)`;
  const products = [0, 1, 2, 3]
    .map((i) => {
      const x = 120 + i * 350;
      return `<rect x="${x}" y="640" width="310" height="230" rx="10" fill="${i % 2 ? soft : softer}"/>
      <rect x="${x + 95}" y="680" width="120" height="150" rx="60" fill="${c}" opacity="${0.18 + i * 0.06}"/>
      <rect x="${x}" y="888" width="200" height="14" rx="4" fill="#2a2a2a" opacity=".75"/>
      <rect x="${x}" y="912" width="90" height="12" rx="4" fill="${c}"/>`;
    })
    .join("");
  return chrome(
    `${l.slug.replace(/-/g, "")}.com`,
    `<rect x="0" y="56" width="${W}" height="38" fill="${c}"/>
    <text x="800" y="81" text-anchor="middle" ${font} font-size="15" fill="#fff">Free US shipping over $50 · 30-day returns</text>
    <text x="120" y="150" ${font} font-size="26" font-weight="800" fill="#1b1b1b">${esc(l.name)}</text>
    <g ${font} font-size="16" fill="#3b3b3b"><text x="980" y="148">Shop</text><text x="1060" y="148">Bestsellers</text><text x="1190" y="148">Reviews</text><text x="1300" y="148">About</text></g>
    <rect x="120" y="200" width="1360" height="380" rx="16" fill="${soft}"/>
    <text x="180" y="340" ${font} font-size="64" font-weight="800" fill="#1b1b1b">${esc(l.line)}</text>
    <text x="180" y="395" ${font} font-size="22" fill="#4a4a4a">Rated 4.8 by 2,000+ customers</text>
    <rect x="180" y="440" width="220" height="60" rx="30" fill="#1b1b1b"/>
    <text x="290" y="478" text-anchor="middle" ${font} font-size="18" font-weight="700" fill="#fff">Shop now</text>
    <circle cx="1220" cy="390" r="150" fill="${c}" opacity=".22"/>
    <circle cx="1220" cy="390" r="95" fill="${c}" opacity=".35"/>
    ${products}`,
  );
}

function analytics(l) {
  const max = Math.max(...l.rev);
  const n = l.rev.length;
  const bw = Math.min(70, 1180 / n - 14);
  const bars = l.rev
    .map((v, i) => {
      const h = (v / max) * 360;
      const x = 340 + i * (1180 / n);
      return `<rect x="${x}" y="${880 - h}" width="${bw}" height="${h}" rx="4" fill="#5b6cff" opacity="${0.55 + (i / n) * 0.45}"/>`;
    })
    .join("");
  const card = (x, label, value) =>
    `<rect x="${x}" y="140" width="290" height="130" rx="12" fill="#fff" stroke="#e3e3e3"/>
    <text x="${x + 24}" y="185" ${font} font-size="16" fill="#6b6b6b">${label}</text>
    <text x="${x + 24}" y="238" ${font} font-size="36" font-weight="700" fill="#1b1b1b">${value}</text>`;
  return chrome(
    "admin.shopify.com/store/analytics",
    `<rect x="0" y="56" width="260" height="${H - 56}" fill="#ebebeb"/>
    <g ${font} font-size="16" fill="#3b3b3b"><text x="32" y="120">Home</text><text x="32" y="160">Orders</text><text x="32" y="200">Products</text><text x="32" y="240">Customers</text><text x="32" y="280" font-weight="700">Analytics</text><text x="32" y="320">Marketing</text></g>
    <text x="320" y="112" ${font} font-size="24" font-weight="700" fill="#1b1b1b">Analytics · ${esc(l.name)}</text>
    ${card(320, "Total sales", "$" + (l.rev.slice(-3).reduce((a, b) => a + b, 0) * 100).toLocaleString("en-US"))}
    ${card(630, "Online store sessions", (l.rev.slice(-1)[0] * 410).toLocaleString("en-US"))}
    ${card(940, "Conversion rate", "2.4%")}
    ${card(1250, "Average order value", "$" + (40 + l.hue % 50))}
    <rect x="320" y="300" width="1220" height="640" rx="12" fill="#fff" stroke="#e3e3e3"/>
    <text x="344" y="345" ${font} font-size="18" font-weight="600" fill="#1b1b1b">Total sales over time</text>
    <line x1="340" y1="880" x2="1520" y2="880" stroke="#dcdcdc"/>
    ${bars}`,
    "#f3f3f3",
  );
}

function ads(l) {
  const rows = ["Prospecting · Broad", "Prospecting · Interests", "Retargeting · 30d", "UGC test · Hooks A–C", "Advantage+ Shopping"]
    .map((name, i) => {
      const y = 330 + i * 110;
      const roas = (1.8 + ((l.hue + i * 37) % 17) / 10).toFixed(2);
      return `<rect x="120" y="${y}" width="1360" height="92" rx="8" fill="#fff" stroke="#e1e4ea"/>
      <circle cx="160" cy="${y + 46}" r="8" fill="${i === 3 ? "#c4c8d0" : "#31a24c"}"/>
      <text x="190" y="${y + 53}" ${font} font-size="19" fill="#1c1e21">${name}</text>
      <text x="820" y="${y + 53}" ${font} font-size="19" fill="#1c1e21">$${(400 + ((l.hue * (i + 3)) % 900)).toLocaleString("en-US")}</text>
      <text x="1040" y="${y + 53}" ${font} font-size="19" fill="#1c1e21">${roas}</text>
      <text x="1240" y="${y + 53}" ${font} font-size="19" fill="#1c1e21">${i === 3 ? "Paused" : "Active"}</text>`;
    })
    .join("");
  return chrome(
    "adsmanager.facebook.com/campaigns",
    `<rect x="0" y="56" width="${W}" height="70" fill="#fff" stroke="#e1e4ea"/>
    <text x="120" y="100" ${font} font-size="22" font-weight="700" fill="#1c1e21">Campaigns · ${esc(l.name)}</text>
    <rect x="1290" y="76" width="190" height="34" rx="6" fill="#1877f2"/>
    <text x="1385" y="99" text-anchor="middle" ${font} font-size="15" font-weight="600" fill="#fff">Last 30 days</text>
    <rect x="120" y="170" width="1360" height="110" rx="8" fill="#fff" stroke="#e1e4ea"/>
    <g ${font} font-size="16" fill="#606770"><text x="150" y="210">Amount spent</text><text x="500" y="210">Purchases</text><text x="820" y="210">Purchase ROAS</text><text x="1140" y="210">Cost per purchase</text></g>
    <g ${font} font-size="30" font-weight="700" fill="#1c1e21"><text x="150" y="255">$${(l.rev.slice(-1)[0] * 31).toLocaleString("en-US")}</text><text x="500" y="255">${l.rev.slice(-1)[0] * 2}</text><text x="820" y="255">2.84</text><text x="1140" y="255">$${(14 + (l.hue % 9)).toFixed(2)}</text></g>
    <g ${font} font-size="15" fill="#606770"><text x="190" y="318">Campaign</text><text x="820" y="318">Spend</text><text x="1040" y="318">ROAS</text><text x="1240" y="318">Delivery</text></g>
    ${rows}`,
    "#f0f2f5",
  );
}

function person(p) {
  const r = Math.min(p.w, p.h);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${p.w} ${p.h}" width="${p.w}" height="${p.h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${p.hue} 18% 26%)"/><stop offset="1" stop-color="hsl(${p.hue} 22% 14%)"/></linearGradient></defs>
  <rect width="${p.w}" height="${p.h}" fill="url(#g)"/>
  <text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Manrope, Inter, Helvetica, Arial, sans-serif" font-weight="800" font-size="${r * 0.36}" letter-spacing="${-r * 0.01}" fill="hsl(${p.hue} 20% 82%)">${p.initials}</text>
</svg>`;
}

for (const l of listings) {
  write(join(root, "listings", l.slug, "storefront.svg"), storefront(l));
  write(join(root, "listings", l.slug, "analytics.svg"), analytics(l));
  write(join(root, "listings", l.slug, "ads.svg"), ads(l));
}
for (const p of people) write(join(root, "people", `${p.file}.svg`), person(p));

console.log(`Wrote ${listings.length * 3} listing screenshots and ${people.length} portraits to /public.`);
