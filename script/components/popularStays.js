import { createVenueCard } from "../render/venueCard.js";

export function renderPopularStays(venues) {
  const venueList = document.getElementById("popular-stays");
  const popularVenues = venues.slice(0, 5);

  venueList.innerHTML = /*html*/ `
    <div class="px-4 py-6 md:px-8 lg:px-12">
    <h2 class="font-body font-semibold text-lg text-black mb-4"
    >
    Popular Stays
    </h2>

    <div 
    id="popular-carousel"
    class="flex snap-x snap-mandatory gap-4 overflow-x-auto px-12 pb-4"
    >
      ${popularVenues.map((venue) => createVenueCard(venue, "featured")).join("")}
    </div>

    <a href="#venue-list"
    class="mt-4 inline-block rounded-full bg-accent-tan px-4 py-2 font-body text-sm font-medium text-black"
    >
      Explore Stays
    </a>
</div>
`;

  const carousel = document.getElementById("popular-carousel");
  const cards = carousel.querySelectorAll("article");

  cards[1].scrollIntoView({
    behavior: "instant",
    inline: "center",
    block: "nearest",
  });
}
