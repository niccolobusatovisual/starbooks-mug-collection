export interface Mug {
  id: number;
  nome: string;
  collezione: string; // "You Are Here" | "Been There" | "Been There Discovery Series"
  tipo: string; // "Città" | "Paese/Regione" | "Speciale/Evento"
  paese: string;
  citta: string;
  anno: string | number;
  foto: string; // percorso relativo dentro /public, es. "mugs/001-roma.jpg"
  note: string;
  colore: string; // hex, colore dominante (dalla foto) o fallback
  coloreFonte: "foto" | "fallback";
}
