import { createVenueCard } from "../render/venueCard.js";

export function renderMoreStays(venues) {
  const moreStays = document.getElementById("more-stays");

  const moreStayVenues = venues.slice(5, 7);

  moreStays.innerHTML = /*html*/ `
    <div class="px-4 py-6 md:px-8 lg:px-12">
    <h2 class="font-body font-semibold text-lg text-black mb-4"
    >
    More!
    </h2>

    <div class="grid grid-cols-2 gap-4">
      ${moreStayVenues.map((venue) => createVenueCard(venue)).join("")}
    </div>
    </div>
`;
}
