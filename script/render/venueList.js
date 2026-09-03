import { createVenueCard } from "../render/venueCard.js";

const itemsPerPage = 8;

export function renderVenueList(venues, containerId = "venue-list") {
  const container = document.getElementById(containerId);

  const currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVenues = venues.slice(startIndex, endIndex);

  container.innerHTML = /*html*/ `
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${paginatedVenues.map((venue) => createVenueCard(venue)).join("")}
        </div>
    `;
}
