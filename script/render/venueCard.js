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
    class="featured-card relative h-75 w-60 shrink-0 
           snap-center overflow-visible rounded-3xl bg-gray-light">
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
              class="h-full w-full object-cover rounded-3xl border-2 border-gray-light"
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
          class="venue-info absolute -bottom-3 left-1/2 w-[85%]
                 -translate-x-1/2 rounded-3xl bg-[#f3f3f3] px-5 py-2 
                 text-center  opacity-0 
                 transition-opacity duration-300"
          >
        <h3 
            class="truncate font-body font-semibold text-base text-black"
            title="${venueName}"
          >
          ${venueName} ★ ${venue.rating}
        </h3>

        

        
      <p class="mt-1 text-xs whitespace-nowrap text-black font-bold"
        >
          
        </p> 
        
        <p class="mt-auto text-lg whitespace-nowrap text-secondary font-bold"
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

  const venueName = venue.name?.trim() || "Unknown Venue";
  const city = venue.location?.city?.trim() || "";
  const country = venue.location?.country?.trim() || "";
  const location = [city, country].filter(Boolean).join(", ");

  return /*html*/ `
  
    <article class="overflow-hidden rounded-lg bg-white">
    <a 
      href="./venue.html?id=${venue.id}"
      class="flex h-full flex-col rounded-2xl 
             focus:outline-none focus-visible:ring-2
             focus-visible:ring-accent-brown"
      aria-label="View ${venueName}"
      >
      ${
        imageUrl
          ? `<img 
                src="${imageUrl}" 
                alt="${imageAlt}" 
                class="h-40 w-full object-cover shrink-0">
           `
          : `<div class="h-40 w-full shrink-0 bg-gray-light"></div>`
      }

      <div class="flex flex-1 flex-col p-3">
        <h3 
          class="font-body font-semibold text-sm text-black line-clamp-1"
          title="${venueName}"
        >
          ${venueName}
      </h3>

        ${
          location
            ? `<p class="mt-1 text-xs text-black line-clamp-1"
            title="${location}"
            >${location}
          </p>`
            : ""
        }

        <div class="mt-3 flex items-end justify-between gap-2">
            <p class="text-xs text-black font-bold"
              >
                ★ ${venue.rating}
            </p> 

            <p class="text-xs text-secondary font-bold"
              >
                ${venue.price} $ / night
          </p>
        </div>
      </div>
      </a>
    </article>
  `;
}
