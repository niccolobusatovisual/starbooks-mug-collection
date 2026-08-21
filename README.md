# StarBooks Mug Collection

Sito per la collezione privata di tazze Starbucks. React + Vite + Tailwind, dati statici (JSON), nessun database esterno — tutto vive nel repository.

## Sviluppo locale

```bash
npm install
npm run dev
```

## Aggiungere/aggiornare le tazze

1. Modifica `StarBooks_Mug_Collection_Database.xlsx` (nella root del progetto) con i dati aggiornati.
2. Rigenera il JSON del sito:
   ```bash
   npm run data:refresh
   ```
   (equivale a `python3 scripts/xlsx_to_json.py StarBooks_Mug_Collection_Database.xlsx src/data/mugs.json`)

## Aggiungere le foto

Le foto vanno scontornate su fondo trasparente, con l'ombra di contatto già inclusa
nell'immagine (il sito non la disegna: senza, la tazza sembra fluttuare).
Formato consigliato: WebP a 1000 px di larghezza, qualità ~86 — circa 45 KB contro i 500 KB
di un PNG equivalente.

1. Metti le foto in `public/mugs/`. Il nome inizia con l'ID a 3 cifre della tazza (colonna `ID`
   nell'Excel) seguito da un trattino:
   - `036-hungary.webp` — vista frontale, quella con il nome. È la foto della card.
   - `036-hungary-retro.webp` — vista posteriore, facoltativa. Si vede solo nell'overlay,
     tramite il selettore Fronte/Retro.
2. Lancia:
   ```bash
   npm run extract-colors
   ```
   Questo popola `foto`, `fotoRetro` e `colore` in `src/data/mugs.json`. Il colore non è la
   media della foto (uscirebbe grigia: la tazza è quasi tutta ceramica bianca) ma la tonalità
   dominante della grafica stampata. Le tazze senza foto restano con un colore di fallback.
3. Rilancia `npm run dev` o `npm run build` per vedere i risultati.

**Attenzione all'ordine:** `npm run data:refresh` rigenera `mugs.json` dall'Excel e azzera
`foto`, `fotoRetro` e i colori. Vanno sempre rilanciati in sequenza:
`npm run data:refresh && npm run extract-colors`.

## Deploy su GitHub Pages

Il repo include un workflow GitHub Actions (`.github/workflows/deploy.yml`) che builda e pubblica automaticamente su GitHub Pages ad ogni push su `main`.

Per attivarlo la prima volta:

1. Crea il repository su GitHub e fai push di questo progetto.
2. Su GitHub: **Settings → Pages → Build and deployment → Source** → seleziona **GitHub Actions**.
3. Ad ogni push su `main`, il sito si aggiorna automaticamente.

**Importante:** se il nome del repository GitHub è diverso da `starbooks-mug-collection`, aggiorna la costante `BASE_PATH` in `vite.config.ts` con il nome corretto (`/nome-repo/`) prima del primo deploy — altrimenti CSS e immagini non si caricheranno correttamente.

## Struttura

- `src/data/mugs.json` — dati delle tazze (generato dall'Excel, non modificarlo a mano)
- `src/components/` — Header, filtri di ricerca, griglia card, overlay di dettaglio
- `public/mugs/` — foto delle tazze
- `scripts/xlsx_to_json.py` — converte l'Excel in JSON
- `scripts/extract-colors.mjs` — estrae il colore dominante da ogni foto

## Prossimi passi possibili

- Visualizzatore 360° per le tazze principali (sequenza di frame + slider drag)
- Pagina "mappa del mondo" con le tazze geolocalizzate
