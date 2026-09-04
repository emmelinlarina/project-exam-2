import { renderHeader } from "../components/header.js";
import { renderHero } from "../components/hero.js";
import { renderPopularStays } from "../components/popularStays.js";
import { renderMoreStays } from "../components/moreStays.js";
import { getVenues } from "../api/venues.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderVenueFilters } from "../components/venueFilters.js";
import { renderVenueList } from "../render/venueList.js";

let currentVenues = [];

renderHeader();

const home = document.getElementById("home");

home.innerHTML = /*html*/ `
  <section id="hero"></section>
  <section id="popular-stays"></section>
  <section id="more-stays"></section>
  <section id="venue-search"></section>
  <section id="venue-filters"></section>
  <section id="venue-list"></section>
  <section id="why-holidaz"></section>
`;

renderHero();

async function loadVenues() {
  try {
    const response = await getVenues();
    const venues = response.data;
    currentVenues = venues;

    renderPopularStays(venues);
    renderMoreStays(venues);
    renderVenueList(venues);
  } catch (error) {
    console.error("Failed to load venues:", error);
  }
}

loadVenues();
renderSearchBar();
renderVenueFilters((sortValue) => {
  let sortedVenues = [...currentVenues];

  if (sortValue === "price-asc") {
    sortedVenues.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "price-desc") {
    sortedVenues.sort((a, b) => b.price - a.price);
  }
  if (sortValue === "rating-asc") {
    sortedVenues.sort((a, b) => a.rating - b.rating);
  }
  if (sortValue === "rating-desc") {
    sortedVenues.sort((a, b) => b.rating - a.rating);
  }
  renderVenueList(sortedVenues);
});
