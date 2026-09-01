export function createVenueCard(venue, variant = "standard") {
  if (variant === "featured") {
    return createFeaturedCard(venue);
  }

  return createStandardCard(venue);
}

function createFeaturedCard(venue) {
  return /*html*/ `
    <article class="h-75 w-60 shrink-0 snap-center overflow-hidden rounded-3xl border border-accent-brown bg-white">
      <div class="h-52 bg-gray-light"></div>
      <div class="p-3">
        <h2 class="font-body font-semibold text-sm text-black">${venue.name}</h2>
        
        <p class="mt-1 text-xs text-secondary font-bold">${venue.price} $ / night</p>
      </div>
    </article>
  `;
}

function createStandardCard(venue) {
  return /*html*/ `
    <article class="overflow-hidden rounded-2xl bg-white">
      <div class="h-32 bg-gray-light"></div>

      <div class="p-2">
        <h2 class="font-body font-semibold text-sm text-black">${venue.name}</h2>
    <p class="mt-1 text-xs text-black font-bold">
                Reviews
            </p>
        <p class="mt-1 text-xs text-secondary font-bold">${venue.price} $ / night</p>

      </div>
    </article>
  `;
}
