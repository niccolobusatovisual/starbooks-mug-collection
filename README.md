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

1. Metti le foto in `public/mugs/`, con nome che inizia con l'ID a 3 cifre della tazza seguito da un trattino, es. `001-roma.jpg`, `037-tokyo.png` (l'ID è la colonna `ID` nell'Excel).
2. Lancia:
   ```bash
   npm run extract-colors
   ```
   Questo calcola automaticamente il colore dominante di ogni foto e aggiorna lo sfondo della card corrispondente in `src/data/mugs.json`. Le tazze senza foto restano con un colore di fallback.
3. Rilancia `npm run dev` o `npm run build` per vedere i risultati.

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
