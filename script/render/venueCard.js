export function createVenueCard(venue, variant = "standard") {
  if (variant === "featured") {
    return createFeaturedCard(venue);
  }

  return createStandardCard(venue);
}

function createFeaturedCard(venue) {
  const imageUrl = venue.media?.[0]?.url;
  const imageAlt = venue.media?.[0]?.alt || venue.name;

  const venueName = venue.name?.trim() || "Unknown Venue";
  const city = venue.location?.city?.trim() || "";
  const country = venue.location?.country?.trim() || "";
  const location = [city, country].filter(Boolean).join(", ");

  return /*html*/ `
  <article 
    class="featured-card relative h-75 w-60 shrink-0 snap-center overflow-visible rounded-3xl border border-accent-brown bg-gray-light">
    <a 
      href="./venue.html?id=${venue.id}"
      class="block h-full w-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-brown"
      aria-label="View ${venue.name}"
      >
      ${
        imageUrl
          ? `
              <img 
              src="${imageUrl}" 
              alt="${imageAlt}" 
              class="h-full w-full object-cover"
              >
            `
          : `
          <div 
          class="h-full w-full shrink-0"
              aria-hidden="true"
              >
          </div>`
      }

      <div 
          class="venue-info absolute -bottom-5 left-1/2 w-[85%]
                 -translate-x-1/2 rounded-2xl bg-white px-5 py-2 
                 text-center shadow-sm opacity-0 
                 transition-opacity duration-300"
          >
        <h3 
            class="truncate font-body font-semibold text-sm text-black">
          ${venueName}
        </h3>

        ${
          location
            ? `
          <p class="mt-1 truncate text-xs whitespace-nowrap text-black font-bold">
          ${location}
          </p>`
            : ""
        }

        
      <p class="mt-1 text-xs whitespace-nowrap text-black font-bold"
        >
          ★ ${venue.rating}
        </p> 
        
        <p class="mt-auto text-base whitespace-nowrap text-secondary font-bold"
        >
        ${venue.price} $ / night
      </p>
      </div>
  </a>
</article>
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
        <h3 
          class="font-body font-semibold text-sm text-black line-clamp-2"
          title="${venue.name}"
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
