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
      className="group relative flex aspect-[16/10] w-full flex-row items-stretch overflow-hidden text-left transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.01] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:aspect-[16/9]"
    >
      {/* Testo e info: metà sinistra */}
      <div className="relative z-10 flex w-1/2 flex-col justify-between p-5 sm:w-[45%] sm:p-8">
        <div className="flex items-start justify-between gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide sm:text-[11px]"
            style={{
              backgroundColor: textColor === "#ffffff" ? "rgba(255,255,255,0.18)" : "rgba(30,57,50,0.12)",
            }}
          >
            {mug.collezione}
          </span>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide opacity-70 sm:text-xs">
            {mug.paese || mug.tipo}
          </p>
          <h3 className="font-display mt-1 text-lg font-semibold leading-tight sm:text-2xl md:text-3xl">
            {mug.nome}
          </h3>
        </div>
      </div>

      {/* Immagine tazza: metà destra */}
      <div className="pointer-events-none relative flex w-1/2 items-center justify-center p-4 sm:w-[55%] sm:p-6">
        {hasPhoto ? (
          <img
            src={`${import.meta.env.BASE_URL}${mug.foto}`}
            alt={mug.nome}
            className="h-[80%] w-auto object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <svg
            viewBox="0 0 64 64"
            className="h-[55%] w-auto opacity-25 transition-transform duration-500 ease-out group-hover:scale-105"
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
    </button>
  );
}
