export function renderHero() {
  const hero = document.getElementById("hero");

  hero.innerHTML = /*html*/ `
    <div class="px-4 md:px-8 lg:px-12">
      <div 
        class="relative flex min-h-80 items-center justify-center overflow-hidden bg-gray-light md:min-h-110 lg:min-h-130"
        aria-hidden="true"
      >
        <div class="w-[85%] max-w-xl rounded-xl bg-secondary/40 px-6 py-2 text-center"
        >
          <h1 class="font-body font-semibold text-xl leading-tight  text-primary md:text-2xl">
          Go somewhere. Stay awhile.
          </h1>
        </div>
      </div>
    </div>
`;
}
