import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";
import { createVenueCard } from "./components/venueCard.js";

renderHeader();

const home = document.getElementById("home");

home.innerHTML = /*html*/ `
  <section id="hero"></section>
  <section id="venue-search"></section>
  <section id="venue-list"></section>
`;
renderHero();

const venueList = document.getElementById("venue-list");

venueList.innerHTML = /*html*/ `
<div class="px-4 py-6 md:px-8 lg:px-12">
    <h2 class="font-body font-semibold text-lg text-black mb-4"
    >
    Popular Stays
</h2>
    <div 
    id="popular-carousel"
    class="flex snap-x snap-mandatory gap-4 overflow-x-auto px-12 pb-4">
      ${createVenueCard()}
      ${createVenueCard()}
      ${createVenueCard()}
      ${createVenueCard()}
      ${createVenueCard()}
    </div>
</div>
`;

const carousel = document.getElementById("popular-carousel");
const cards = carousel.querySelectorAll("article");

cards[1].scrollIntoView({
  behavior: "instant",
  inline: "center",
  block: "nearest",
});
