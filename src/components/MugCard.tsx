import type { Mug } from "../types";
import { readableTextColor } from "../lib/contrast";

interface MugCardProps {
  mug: Mug;
  onClick: () => void;
}

export default function MugCard({ mug, onClick }: MugCardProps) {
  const textColor = readableTextColor(mug.colore);
  const hasPhoto = Boolean(mug.foto);

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: mug.colore, color: textColor }}
      className="group relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden p-6 text-left transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.015] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:p-8"
    >
      <div className="flex items-start justify-between">
        <span
          className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{
            backgroundColor: textColor === "#ffffff" ? "rgba(255,255,255,0.18)" : "rgba(30,57,50,0.12)",
          }}
        >
          {mug.collezione}
        </span>
        {mug.anno && (
          <span className="text-xs font-medium opacity-70">{mug.anno}</span>
        )}
      </div>

      {/* Immagine tazza: mostrata quando presente, altrimenti un placeholder elegante */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {hasPhoto ? (
          <img
            src={`${import.meta.env.BASE_URL}${mug.foto}`}
            alt={mug.nome}
            className="h-[62%] w-auto object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <svg
            viewBox="0 0 64 64"
            className="h-[42%] w-auto opacity-25 transition-transform duration-500 ease-out group-hover:scale-105"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 20h32v22a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10V20Z" />
            <path d="M44 24h4a6 6 0 0 1 0 12h-4" />
            <path d="M20 12c0-2 2-3 2-5s-2-3-2-5" />
            <path d="M30 12c0-2 2-3 2-5s-2-3-2-5" />
          </svg>
        )}
      </div>

      <div className="relative">
        <p className="text-xs font-medium uppercase tracking-wide opacity-70">
          {mug.paese || mug.tipo}
        </p>
        <h3 className="font-display mt-1 text-2xl font-semibold leading-none sm:text-3xl">
          {mug.nome}
        </h3>
      </div>
    </button>
  );
}
