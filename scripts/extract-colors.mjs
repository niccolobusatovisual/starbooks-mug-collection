// Estrae il colore caratteristico da ogni foto tazza e aggiorna src/data/mugs.json.
//
// Come funziona:
// - Cerca in public/mugs/ un file che inizia con "<id>-" (es. 001-roma.jpg, 037-tokyo.webp).
//   Le viste posteriori (`-retro`) vengono ignorate: la card usa la vista frontale.
// - Le foto sono scontornate su fondo trasparente: si considerano solo i pixel opachi,
//   così lo sfondo non inquina il colore.
// - La media semplice non funziona: la tazza è quasi tutta ceramica bianca e il
//   risultato sarebbe grigio per ogni tazza. Si cerca invece il colore *dominante
//   della grafica*: si scartano i pixel bianchi/grigi, si raggruppano i restanti per
//   tonalità e si prende il gruppo più rappresentato.
// - La luminosità finale viene normalizzata per garantire contrasto col testo sopra.
//
// Uso: npm run extract-colors
// (va rilanciato ogni volta che aggiungi/sostituisci foto)

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PHOTOS_DIR = path.join(ROOT, "public", "mugs");
const DATA_PATH = path.join(ROOT, "src", "data", "mugs.json");

const HUE_BINS = 24;
const MIN_SAT = 0.22; // sotto questa saturazione è ceramica/ombra, non grafica
const MAX_LUM = 0.88;
const MIN_LUM = 0.06;
const TARGET_LUM = [0.26, 0.42]; // finestra in cui il testo bianco resta leggibile
const TARGET_SAT = [0.3, 0.72];

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hk(h + 1 / 3) * 255, hk(h) * 255, hk(h - 1 / 3) * 255];
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function median(xs) {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

function toHex([r, g, b]) {
  const c = (v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

async function characteristicColor(filePath) {
  const { data, info } = await sharp(filePath)
    .resize(96, 96, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  const bins = Array.from({ length: HUE_BINS }, () => ({ weight: 0, sats: [], lums: [] }));
  let opaque = 0;
  let sumR = 0, sumG = 0, sumB = 0;

  for (let i = 0; i < data.length; i += ch) {
    if (ch === 4 && data[i + 3] < 230) continue; // pixel di sfondo o bordo sfumato
    opaque++;
    sumR += data[i]; sumG += data[i + 1]; sumB += data[i + 2];

    const [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
    if (s < MIN_SAT || l > MAX_LUM || l < MIN_LUM) continue;

    const bin = bins[Math.min(HUE_BINS - 1, Math.floor(h * HUE_BINS))];
    bin.weight += s;
    bin.sats.push(s);
    bin.lums.push(l);
  }

  if (opaque === 0) return "#1E3932";

  const best = bins.reduce((a, b) => (b.weight > a.weight ? b : a), bins[0]);

  // Nessuna grafica colorata riconoscibile: ripiego sulla media scurita.
  if (best.sats.length < opaque * 0.01) {
    return toHex([sumR / opaque, sumG / opaque, sumB / opaque].map((v) => v * 0.45));
  }

  // Tonalità = centro del bin di hue più rappresentato.
  const hue = (bins.indexOf(best) + 0.5) / HUE_BINS;

  const sat = clamp(median(best.sats), ...TARGET_SAT);
  const lum = clamp(median(best.lums) * 0.7, ...TARGET_LUM);

  return toHex(hslToRgb(hue, sat, lum));
}

async function main() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.log(`Nessuna cartella ${PHOTOS_DIR} trovata: nessuna foto da processare ancora.`);
    return;
  }
  const files = fs.readdirSync(PHOTOS_DIR);
  const mugs = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

  let updated = 0;
  for (const mug of mugs) {
    const idStr = String(mug.id).padStart(3, "0");
    const match = files
      .filter((f) => f.startsWith(`${idStr}-`) || f.startsWith(`${mug.id}-`))
      .filter((f) => !/-retro\.[a-z0-9]+$/i.test(f))[0];
    if (!match) continue;

    const filePath = path.join(PHOTOS_DIR, match);
    try {
      mug.colore = await characteristicColor(filePath);
      mug.coloreFonte = "foto";
      mug.foto = `mugs/${match}`;
      updated++;
    } catch (err) {
      console.warn(`Impossibile leggere ${match}:`, err.message);
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(mugs, null, 2), "utf-8");
  console.log(`Colori aggiornati per ${updated} tazze su ${mugs.length}.`);
}

main();
