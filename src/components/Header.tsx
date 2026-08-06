interface HeaderProps {
  total: number;
  shown: number;
}

export default function Header({ total, shown }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-brand-dark text-white">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="StarBooks Mug Collection"
            className="h-11 w-11 sm:h-14 sm:w-14"
          />
          <div>
            <h1 className="font-display text-lg leading-tight tracking-tight sm:text-2xl">
              StarBooks Mug Collection
            </h1>
            <p className="hidden text-xs text-brand-light/80 sm:block">
              Una collezione privata, in giro per il mondo
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium sm:px-4 sm:text-sm">
          {shown === total ? `${total} tazze` : `${shown} / ${total} tazze`}
        </div>
      </div>
    </header>
  );
}
