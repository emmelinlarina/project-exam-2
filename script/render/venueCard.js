export function createVenueCard(variant = "standard") {
  if (variant === "featured") {
    return createFeaturedCard();
  }

  return createStandardCard();
}

function createFeaturedCard() {
  return /*html*/ `
    <article class="h-75 w-60 shrink-0 snap-center overflow-hidden rounded-3xl border border-accent-brown bg-white">
      <div class="h-52 bg-gray-light"></div>
      <div class="p-3">
        <h2 class="font-body font-semibold text-sm text-black">Featured Venue Title</h2>
        
        <p class="mt-1 text-xs text-secondary font-bold">1,500 NOK / night</p>
      </div>
    </article>
  `;
}

function createStandardCard() {
  return /*html*/ `
    <article class="overflow-hidden rounded-2xl bg-white">
      <div class="h-32 bg-gray-light"></div>

      <div class="p-2">
        <h2 class="font-body font-semibold text-sm text-black">Venue Title</h2>
    <p class="mt-1 text-xs text-black font-bold">
                Reviews
            </p>
        <p class="mt-1 text-xs text-secondary font-bold">1,500 NOK / night</p>

      </div>
    </article>
  `;
}
