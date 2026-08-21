import { useEffect, useState } from "react";
import type { Mug } from "../types";
import { readableTextColor } from "../lib/contrast";
import descrizioni from "../data/descrizioni.json";

interface MugOverlayProps {
  mug: Mug | null;
  onClose: () => void;
}

const testi = descrizioni as Record<string, string>;

type Vista = "fronte" | "retro";

export default function MugOverlay({ mug, onClose }: MugOverlayProps) {
  const [vista, setVista] = useState<Vista>("fronte");

  // Ogni tazza si apre sempre sulla vista frontale.
  useEffect(() => {
    setVista("fronte");
  }, [mug?.id]);

  useEffect(() => {
    if (!mug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mug, onClose]);

  if (!mug) return null;
  const textColor = readableTextColor(mug.colore);
  const scuroSuChiaro = textColor !== "#ffffff";
  const disco = scuroSuChiaro ? "rgba(30,57,50,0.09)" : "rgba(255,255,255,0.13)";
  const velo = scuroSuChiaro ? "rgba(30,57,50,0.12)" : "rgba(255,255,255,0.18)";
  const haRetro = Boolean(mug.fotoRetro);
  const viste: { chiave: Vista; etichetta: string; src: string }[] = [
    { chiave: "fronte", etichetta: "Fronte", src: mug.foto },
    ...(haRetro ? [{ chiave: "retro" as Vista, etichetta: "Retro", src: mug.fotoRetro }] : []),
  ];

  const luogo = [mug.citta, mug.paese].filter(Boolean).join(", ") || mug.nome;
  const mapQuery = encodeURIComponent(luogo);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=6&ie=UTF8&iwloc=&output=embed`;
  const descrizione = testi[`${mug.nome}|${mug.collezione}`];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-deep/60 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Dettagli tazza ${mug.nome}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row"
      >
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-deep shadow hover:bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Visual: fronte e retro, sovrapposti e incrociati in dissolvenza */}
        <div
          style={{ backgroundColor: mug.colore, color: textColor }}
          className="flex min-h-[220px] flex-col items-center justify-center gap-5 p-8 sm:min-h-[420px] sm:w-2/5 sm:shrink-0"
        >
          {mug.foto ? (
            <>
              <div
                onClick={haRetro ? () => setVista(vista === "fronte" ? "retro" : "fronte") : undefined}
                className={`relative h-[200px] w-full sm:h-[300px] ${haRetro ? "cursor-pointer" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: disco }}
                />
                {viste.map((v) => (
                  <img
                    key={v.chiave}
                    src={`${import.meta.env.BASE_URL}${v.src}`}
                    alt={`${mug.nome} — vista ${v.etichetta.toLowerCase()}`}
                    aria-hidden={vista !== v.chiave}
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-out ${
                      vista === v.chiave ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              {haRetro && (
                <div
                  className="flex gap-1 rounded-full p-1"
                  style={{ backgroundColor: velo }}
                  role="group"
                  aria-label="Vista della tazza"
                >
                  {viste.map((v) => (
                    <button
                      key={v.chiave}
                      onClick={() => setVista(v.chiave)}
                      aria-pressed={vista === v.chiave}
                      className="rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-opacity"
                      style={
                        vista === v.chiave
                          ? { backgroundColor: textColor, color: mug.colore }
                          : { opacity: 0.75 }
                      }
                    >
                      {v.etichetta}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <svg viewBox="0 0 64 64" className="h-40 w-40 opacity-25" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h32v22a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10V20Z" />
              <path d="M44 24h4a6 6 0 0 1 0 12h-4" />
              <path d="M20 12c0-2 2-3 2-5s-2-3-2-5" />
              <path d="M30 12c0-2 2-3 2-5s-2-3-2-5" />
            </svg>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-mid">
            {mug.collezione}
          </p>
          <h2 className="font-display mt-1 text-3xl font-semibold text-brand-deep">{mug.nome}</h2>

          {(mug.citta || mug.paese || mug.tipo) && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-brand-deep/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <span className="font-medium text-brand-deep">
                {[mug.citta, mug.paese].filter(Boolean).join(", ") || mug.tipo}
              </span>
            </div>
          )}

          {descrizione && (
            <p className="mt-5 text-sm leading-relaxed text-brand-deep/80">{descrizione}</p>
          )}

          {mug.note && (
            <div className="mt-6 border-t border-brand-light pt-6">
              <dt className="text-sm text-brand-deep/50">Note</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-deep">{mug.note}</dd>
            </div>
          )}

          <div className="mt-6 overflow-hidden rounded-xl border border-brand-light">
            <iframe
              title={`Mappa ${luogo}`}
              src={mapSrc}
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
