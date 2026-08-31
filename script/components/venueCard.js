export function createVenueCard() {
  return /*html*/ `
    <article 
    class="h-75 w-60 shrink-0 snap-center overflow-hidden rounded-3xl border border-accent-brown bg-white"
    >
      <div class="h-52 bg-gray-light"></div>

      <div class="p-3 text-center">
        <h2 class="font-body font-semibold text-sm text-black"
        >
        Venue Title
        </h2>

        <p class="mt-1 text-xs text-secondary"
        >
        1,500 NOK / night
        </p>
      </div>
    </article>
  `;
}
