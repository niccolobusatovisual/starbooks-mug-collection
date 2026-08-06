import { useMemo, useState } from "react";
import mugsData from "./data/mugs.json";
import type { Mug } from "./types";
import Header from "./components/Header";
import SearchFilters from "./components/SearchFilters";
import MugGrid from "./components/MugGrid";
import MugOverlay from "./components/MugOverlay";

const mugs = mugsData as Mug[];

function App() {
  const [query, setQuery] = useState("");
  const [collezione, setCollezione] = useState("");
  const [paese, setPaese] = useState("");
  const [selected, setSelected] = useState<Mug | null>(null);

  const collezioni = useMemo(
    () => Array.from(new Set(mugs.map((m) => m.collezione))).sort(),
    []
  );
  const paesi = useMemo(
    () =>
      Array.from(new Set(mugs.map((m) => m.paese).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b)
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mugs.filter((m) => {
      if (collezione && m.collezione !== collezione) return false;
      if (paese && m.paese !== paese) return false;
      if (q) {
        const haystack = `${m.nome} ${m.paese} ${m.citta} ${m.tipo}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, collezione, paese]);

  const hasActiveFilters = Boolean(query || collezione || paese);

  return (
    <div className="min-h-screen bg-cream">
      <Header total={mugs.length} shown={filtered.length} />
      <SearchFilters
        query={query}
        onQueryChange={setQuery}
        collezione={collezione}
        onCollezioneChange={setCollezione}
        paese={paese}
        onPaeseChange={setPaese}
        collezioni={collezioni}
        paesi={paesi}
        onReset={() => {
          setQuery("");
          setCollezione("");
          setPaese("");
        }}
        hasActiveFilters={hasActiveFilters}
      />
      <main>
        <MugGrid mugs={filtered} onSelect={setSelected} />
      </main>

      <footer className="border-t border-brand-light/60 bg-brand-deep py-8 text-center text-xs text-white/50">
        StarBooks Mug Collection — collezione privata · {mugs.length} tazze
      </footer>

      <MugOverlay mug={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
