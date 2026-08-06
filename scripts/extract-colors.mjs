// Estrae il colore dominante da ogni foto tazza e aggiorna src/data/mugs.json.
//
// Come funziona:
// - Cerca in public/mugs/ un file che inizia con "<id>-" (es. 001-roma.jpg, 037-tokyo.png)
// - Se lo trova, calcola il colore medio dell'immagine (ridimensionata a 1x1 px) e lo
//   scurisce leggermente per garantire buon contrasto col testo bianco sopra
// - Se non lo trova, lascia il colore di fallback già presente in mugs.json
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

function darken([r, g, b], amount = 0.25) {
  return [r * (1 - amount), g * (1 - amount), b * (1 - amount)];
}

function toHex([r, g, b]) {
  const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

async function dominantColor(filePath) {
  const { data } = await sharp(filePath)
    .resize(1, 1, { fit: "cover" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return [data[0], data[1], data[2]];
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
    const match = files.find((f) => f.startsWith(`${idStr}-`) || f.startsWith(`${mug.id}-`));
    if (!match) continue;

    const filePath = path.join(PHOTOS_DIR, match);
    try {
      const rgb = await dominantColor(filePath);
      mug.colore = toHex(darken(rgb));
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
