interface SearchFiltersProps {
  query: string;
  onQueryChange: (v: string) => void;
  collezione: string;
  onCollezioneChange: (v: string) => void;
  paese: string;
  onPaeseChange: (v: string) => void;
  collezioni: string[];
  paesi: string[];
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function SearchFilters({
  query,
  onQueryChange,
  collezione,
  onCollezioneChange,
  paese,
  onPaeseChange,
  collezioni,
  paesi,
  onReset,
  hasActiveFilters,
}: SearchFiltersProps) {
  return (
    <div className="sticky top-[72px] z-20 border-b border-brand-light/60 bg-cream/95 backdrop-blur sm:top-[84px]">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-5 py-3 sm:px-8">
        <div className="relative min-w-[200px] flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-deep/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Cerca per nome, città o paese…"
            className="w-full rounded-full border border-brand-light bg-white py-2 pl-9 pr-4 text-sm text-brand-deep placeholder:text-brand-deep/40 focus:border-brand-mid focus:outline-none focus:ring-2 focus:ring-brand-mid/30"
          />
        </div>

        <select
          value={collezione}
          onChange={(e) => onCollezioneChange(e.target.value)}
          className="rounded-full border border-brand-light bg-white px-4 py-2 text-sm text-brand-deep focus:border-brand-mid focus:outline-none focus:ring-2 focus:ring-brand-mid/30"
        >
          <option value="">Tutte le collezioni</option>
          {collezioni.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={paese}
          onChange={(e) => onPaeseChange(e.target.value)}
          className="rounded-full border border-brand-light bg-white px-4 py-2 text-sm text-brand-deep focus:border-brand-mid focus:outline-none focus:ring-2 focus:ring-brand-mid/30"
        >
          <option value="">Tutti i paesi</option>
          {paesi.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="rounded-full px-3 py-2 text-sm font-medium text-brand-mid underline-offset-2 hover:underline"
          >
            Azzera filtri
          </button>
        )}
      </div>
    </div>
  );
}
