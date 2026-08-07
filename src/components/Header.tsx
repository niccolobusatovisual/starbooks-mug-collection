export default function Header() {
  return (
    <header className="bg-brand-dark text-white">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-3 px-5 py-7 text-center sm:px-8 sm:py-9">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="StarBooks Mug Collection"
          className="h-16 w-16 sm:h-20 sm:w-20"
        />
        <div>
          <h1 className="font-display text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
            StarBooks Mug Collection
          </h1>
          <p className="mt-1.5 text-sm text-white/70 sm:text-base">
            Una collezione privata, in giro per il mondo
          </p>
        </div>
      </div>
    </header>
  );
}
