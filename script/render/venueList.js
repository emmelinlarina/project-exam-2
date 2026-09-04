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
  
        <div class="grid grid-cols-2 px-4 md:grid-cols-3 md:px-8 lg:grid-cols-4 lg:px-12 gap-4 ">
          ${paginatedVenues.map((venue) => createVenueCard(venue)).join("")}
        </div>

        <div class="flex justify-center items-center gap-3 mt-6">
            <button
              type="button"
              id="previous-page"
              class="flex h-8 w-8 items-center justify-center ${
                currentPage === 1 ? "invisible" : ""
              }"
              aria-label="Previous page"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <span class="min-w-6 text-center font-body text-sm font-medium">
              ${currentPage}
            </span>

            <button
              type="button"
              id="next-page"
              class="flex h-8 w-8 items-center justify-center ${
                currentPage === totalPages ? "invisible" : ""
              }"
              aria-label="Next page"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
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
