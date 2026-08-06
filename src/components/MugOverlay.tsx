import { useEffect } from "react";
import type { Mug } from "../types";
import { readableTextColor } from "../lib/contrast";

interface MugOverlayProps {
  mug: Mug | null;
  onClose: () => void;
}

export default function MugOverlay({ mug, onClose }: MugOverlayProps) {
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

        {/* Visual */}
        <div
          style={{ backgroundColor: mug.colore, color: textColor }}
          className="flex min-h-[260px] flex-1 items-center justify-center p-8 sm:min-h-[420px]"
        >
          {mug.foto ? (
            <img
              src={`${import.meta.env.BASE_URL}${mug.foto}`}
              alt={mug.nome}
              className="h-full max-h-[380px] w-auto object-contain drop-shadow-2xl"
            />
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

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-brand-deep/50">Tipo</dt>
              <dd className="mt-0.5 font-medium text-brand-deep">{mug.tipo || "—"}</dd>
            </div>
            <div>
              <dt className="text-brand-deep/50">Anno</dt>
              <dd className="mt-0.5 font-medium text-brand-deep">{mug.anno || "—"}</dd>
            </div>
            <div>
              <dt className="text-brand-deep/50">Paese</dt>
              <dd className="mt-0.5 font-medium text-brand-deep">{mug.paese || "—"}</dd>
            </div>
            <div>
              <dt className="text-brand-deep/50">Città / Regione</dt>
              <dd className="mt-0.5 font-medium text-brand-deep">{mug.citta || "—"}</dd>
            </div>
          </dl>

          {mug.note && (
            <div className="mt-6 border-t border-brand-light pt-6">
              <dt className="text-brand-deep/50 text-sm">Note</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-deep">{mug.note}</dd>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
