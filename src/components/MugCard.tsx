import type { Mug } from "../types";
import { readableTextColor } from "../lib/contrast";

interface MugCardProps {
  mug: Mug;
  onClick: () => void;
}

export default function MugCard({ mug, onClick }: MugCardProps) {
  const textColor = readableTextColor(mug.colore);
  const hasPhoto = Boolean(mug.foto);
  const scuroSuChiaro = textColor !== "#ffffff";
  const velo = scuroSuChiaro ? "rgba(30,57,50,0.12)" : "rgba(255,255,255,0.18)";
  const disco = scuroSuChiaro ? "rgba(30,57,50,0.09)" : "rgba(255,255,255,0.13)";

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: mug.colore, color: textColor }}
      className="group relative flex aspect-[16/10] w-full flex-row items-stretch overflow-hidden text-left transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.01] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:aspect-[16/9]"
    >
      {/* Testo e info: metà sinistra, centrata verticalmente */}
      <div className="relative z-10 flex w-1/2 flex-col justify-center p-5 sm:w-[45%] sm:p-8">
        <p className="text-[11px] font-medium uppercase tracking-wide opacity-70 sm:text-xs">
          {mug.paese || mug.tipo}
        </p>

        <h3 className="font-display mt-1 text-lg font-semibold leading-tight sm:text-2xl md:text-3xl">
          {mug.nome}
        </h3>

        <div className="mt-3">
          <span
            className="inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide sm:text-[11px]"
            style={{ backgroundColor: velo }}
          >
            {mug.collezione}
          </span>
        </div>
      </div>

      {/* Immagine tazza: metà destra, appoggiata su un disco che le fa da piano */}
      <div className="pointer-events-none relative flex w-1/2 items-center justify-center p-4 sm:w-[55%] sm:p-6">
        {hasPhoto ? (
          <>
            <span
              aria-hidden="true"
              className="absolute aspect-square w-[64%] rounded-full transition-transform duration-500 ease-out group-hover:scale-105"
              style={{ backgroundColor: disco }}
            />
            <img
              src={`${import.meta.env.BASE_URL}${mug.foto}`}
              alt={mug.nome}
              loading="lazy"
              className="relative h-[80%] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </>
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
