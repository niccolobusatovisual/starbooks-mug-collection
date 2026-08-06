import type { Mug } from "../types";
import MugCard from "./MugCard";

interface MugGridProps {
  mugs: Mug[];
  onSelect: (mug: Mug) => void;
}

export default function MugGrid({ mugs, onSelect }: MugGridProps) {
  if (mugs.length === 0) {
    return (
      <div className="mx-auto max-w-[1600px] px-5 py-24 text-center sm:px-8">
        <p className="font-display text-2xl text-brand-deep">Nessuna tazza trovata</p>
        <p className="mt-2 text-sm text-brand-deep/60">
          Prova a modificare la ricerca o i filtri.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-[2px] bg-brand-deep/10 sm:grid-cols-2">
      {mugs.map((mug) => (
        <MugCard key={mug.id} mug={mug} onClick={() => onSelect(mug)} />
      ))}
    </div>
  );
}
