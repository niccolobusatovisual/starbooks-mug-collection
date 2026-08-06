// Decide se il testo sopra un colore di sfondo debba essere chiaro o scuro,
// in base alla luminanza percepita del colore (formula standard WCAG semplificata).
export function readableTextColor(hex: string): "#ffffff" | "#1e3932" {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#1e3932" : "#ffffff";
}
