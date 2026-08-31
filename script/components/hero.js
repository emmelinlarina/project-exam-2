export function renderHero() {
  const hero = document.getElementById("hero");

  hero.innerHTML = /*html*/ `
    <div class="px-4 pt-4 md:px-8 lg:px-12">
      <div 
      class="min-h-80 rounded-xl bg-gray-light md:min-h-110 lg:min-h-130"
      aria-hidden="true"
      ></div>

      <div class="flex flex-col items-center py-5 text-center">
        <h1 class="font-body font-semibold text-base leading-tight text-accent-blue md:text-lg">
        Go somewhere.<br />
        Stay awhile.
        </h1>

        <div class="mt-4 flex items-center gap-3">

            <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full bg-gray-light to-accent-blue"
            aria-label="View popular stays"
            >
            <i class="fa-regular fa-star" aria-hidden="true"></i>
            </button>

            <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full bg-gray-light to-accent-blue"
            aria-label="View new stays"
            >
            <i class="fa-regular fa-heart" aria-hidden="true"></i>
            </button>

            <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full bg-gray-light to-accent-blue"
            aria-label="View featured stays"
            >
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </button>
        </div>
      </div>
    </div>
  `;
}
