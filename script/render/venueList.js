import { createVenueCard } from "../render/venueCard.js";

export function renderVenueList(venues, containerId = "venue-list") {
  const container = document.getElementById(containerId);

  container.innerHTML = /*html*/ `
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${venues.map((venue) => createVenueCard(venue)).join("")}
        </div>
    `;
}
