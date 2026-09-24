import { createVenueCard } from "../render/venueCard.js";

const itemsPerPage = 8;

export function renderVenueList(
  venues,
  containerId = "venue-list",
  currentPage = 1,
) {
  const container = document.getElementById(containerId);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVenues = venues.slice(startIndex, endIndex);
  const totalPages = Math.ceil(venues.length / itemsPerPage);

  container.innerHTML = /*html*/ `
      <div class="px-4 md:px-8 lg:px-12">
        <div class="mx-auto max-w-7xl">

          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:px-8 lg:grid-cols-4">
            ${paginatedVenues.map((venue) => createVenueCard(venue)).join("")}
          </div>

          ${
            totalPages > 1
              ? `
              <nav 
                  class="mt-8 mb-5 flex items-center justify-center gap-3"
                  aria-label="Venue pages"
              >
                <button 
                  type="button"
                  id="previous-page"
                  class="flex h-9 w-9 items-center justify-center rounded-full
                         border border-accent-brown transition hover:bggraylight
                         ${currentPage === 1 ? "invisible" : ""}"
                  aria-label="Previous page"
                > 
                  <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
                </button>

                <span class="min-w-8 text-center font-body text-sm font-medium">
                  ${currentPage} / ${totalPages}
                </span>

                <button 
                  type="button"
                  id="next-page"
                  class="flex h-9 w-9 items-center justify-center rounded-full
                         border border-accent-brown transition hover:bggraylight
                         ${currentPage === totalPages ? "invisible" : ""}"
                  aria-label="Next page"
                >
                  <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </button>
              </nav>
            `
              : ""
          }
    `;

  const previousButton = container.querySelector("#previous-page");
  const nextButton = container.querySelector("#next-page");

  previousButton?.addEventListener("click", () => {
    renderVenueList(venues, containerId, currentPage - 1);
  });

  nextButton?.addEventListener("click", () => {
    renderVenueList(venues, containerId, currentPage + 1);
  });
}
