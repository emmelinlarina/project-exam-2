export function createVenueCard(venue, variant = "standard") {
  if (variant === "featured") {
    return createFeaturedCard(venue);
  }

  return createStandardCard(venue);
}

function createFeaturedCard(venue) {
  const imageUrl = venue.media?.[0]?.url;
  const imageAlt = venue.media?.[0]?.alt || venue.name;

  return /*html*/ `
  <a href="./venue.html?id=${venue.id}"
  class="block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-brown">
    <article class="flex flex-col h-75 w-60 shrink-0 snap-center overflow-hidden rounded-3xl border border-accent-brown bg-white">
      
    ${
      imageUrl
        ? `<img 
      src="${imageUrl}" 
      alt="${imageAlt}" 
      class="h-52 w-full object-cover shrink-0 bg-gray-light">
      `
        : `<div class="h-52 w-full object-cover shrink-0"></div>`
    }

      <div class="p-3 flex flex-col flex-1">
        <h3 class="font-body font-semibold text-sm text-black line-clamp-2"
        >
        ${venue.name}
      </h3>

      <p class="mt-1 text-xs text-black font-bold"
        >
          ★ ${venue.rating}
        </p> 
        
        <p class="mt-auto text-xs text-secondary font-bold"
        >
        ${venue.price} $ / night
      </p>
      </div>
    </article>
  </a>
  `;
}

function createStandardCard(venue) {
  const imageUrl = venue.media?.[0]?.url;
  const imageAlt = venue.media?.[0]?.alt || venue.name;

  return /*html*/ `
  <a href="./venue.html?id=${venue.id}"
  class="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-brown">
    <article class="overflow-hidden rounded-2xl bg-white">
      ${
        imageUrl
          ? `<img 
      src="${imageUrl}" 
      alt="${imageAlt}" 
      class="h-32 w-full object-cover shrink-0">
      `
          : `<div class="h-32 w-full shrink-0 bg-gray-light"></div>`
      }

      <div class="p-2">
        <h3 class="font-body font-semibold text-sm text-black line-clamp-2"
        >${venue.name}
      </h3>

        <p class="mt-1 text-xs text-black font-bold"
        >
          ★ ${venue.rating}
        </p> 

        <p class="mt-1 text-xs text-secondary font-bold"
        >
           ${venue.price} $ / night
      </p>

      </div>
    </article>
  </a>
  `;
}
