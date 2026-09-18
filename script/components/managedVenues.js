import { getProfileVenues } from "../api/venues.js";

export async function renderManagedVenues(profile) {
  if (!profile?.venueManager) return;

  const container = document.getElementById("managedVenuesContainer");

  if (!container) return;

  container.innerHTML = `
    <p class="col-span-full text-sm text-gray-dark">
      Loading venues...
    </p>
  `;

  try {
    const response = await getProfileVenues(profile.name);
    const venues = response.data;

    if (venues.length === 0) {
      container.innerHTML = `
          <div class="col-span-full rounded-3xl border border-accent-brown bg-white p-8 text-center">
             <h3 class="text-lg font-semibold">
               You have no managed venues yet.
             </h3>
             <p class="mt-1 text-sm text-gray-dark">
               Start by creating a new venue.
             </p>
          </div>
        `;
    }

    if (venues.length > 0) {
      container.innerHTML = venues
        .map((venue) => {
          const image = venue.media?.[0]?.url || "";

          return `
              <article class="overflow-hidden rounded-3xl border border-accent-brown bg-white">
              <a href="./venue.html?id=${venue.id}" class="block">
                <img 
                  src="${image}" 
                  alt="${venue.name || ""}" 
                  class="w-full h-48 object-cover"
                />

                <div class="p-5 text-gray-dark">

                  <h3 class="text-lg font-semibold">
                  ${venue.name}
                  </h3>

                  <p class="mt-1 text-sm ">
                  ${venue.location?.city}, ${venue.location?.country}
                  </p>

                  <p class="mt-3 flex items-center justify-between">
                  $${venue.price} per night
                  </p>

                  <p class="mt-3 text-sm text-gray-dark">
                  Max ${venue.maxGuests} guests
                  </p>

                </div>
                </a>
              </article>
            `;
        })
        .join("");
    }

    console.log("Managed venues", venues);
  } catch (error) {
    console.error("Failed to load managed venues", error);
  }
}
