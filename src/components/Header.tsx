export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-brand-dark text-white">
      <div className="mx-auto flex max-w-[1600px] items-center justify-center px-5 py-3 sm:px-8">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="StarBooks Mug Collection"
          className="h-14 w-14 sm:h-16 sm:w-16"
        />
      </div>
    </header>
  );
}
