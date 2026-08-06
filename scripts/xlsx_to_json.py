import openpyxl, json, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else "StarBooks_Mug_Collection_Database.xlsx"
OUT = sys.argv[2] if len(sys.argv) > 2 else "src/data/mugs.json"

# Palette di fallback (finché non ci sono foto reali da cui estrarre il colore dominante).
# Mix di verdi brand + neutri caldi ispirati al caffè, per dare varietà nel frattempo.
FALLBACK_PALETTE = [
    "#006241", "#00754A", "#1E3932", "#7A5C3E", "#B08968",
    "#3F513F", "#2B4C3F", "#8C6A4F", "#0F3B2E", "#4A6B5A",
]

wb = openpyxl.load_workbook(SRC, data_only=True)
ws = wb["Tazze"]

rows = list(ws.iter_rows(min_row=2, values_only=True))
mugs = []
for i, r in enumerate(rows):
    if r[0] is None:
        continue
    id_, nome, collezione, tipo, paese, citta, anno, foto, note = (list(r) + [None]*9)[:9]
    mugs.append({
        "id": int(id_),
        "nome": nome or "",
        "collezione": collezione or "",
        "tipo": tipo or "",
        "paese": paese or "",
        "citta": citta or "",
        "anno": anno or "",
        "foto": foto or "",
        "note": note or "",
        "colore": FALLBACK_PALETTE[i % len(FALLBACK_PALETTE)],
        "coloreFonte": "fallback"
    })

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(mugs, f, ensure_ascii=False, indent=2)

print(f"Scritte {len(mugs)} tazze in {OUT}")
