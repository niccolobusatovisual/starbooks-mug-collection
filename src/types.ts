export interface Mug {
  id: number;
  nome: string;
  collezione: string; // "You Are Here" | "Been There" | "Been There Discovery Series"
  tipo: string; // "Città" | "Paese/Regione" | "Speciale/Evento"
  paese: string;
  citta: string;
  anno: string | number;
  foto: string; // vista frontale, percorso dentro /public, es. "mugs/001-roma.webp"
  fotoRetro: string; // vista posteriore, es. "mugs/001-roma-retro.webp" ("" se assente)
  note: string;
  colore: string; // hex, colore dominante (dalla foto) o fallback
  coloreFonte: "foto" | "fallback";
}
