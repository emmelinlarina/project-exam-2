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
renderSearchBar((venues) => {
  currentVenues = venues;
  renderVenueList(venues);
});

renderVenueFilters((filters) => {
  let filteredVenues = [...currentVenues];

  if (filters.location) {
    const location = filters.location.toLowerCase();

    filteredVenues = filteredVenues.filter((venue) => {
      const city = venue.location?.city?.toLowerCase() || "";
      const country = venue.location?.country?.toLowerCase() || "";
      const continent = venue.location?.continent?.toLowerCase() || "";

      return (
        city.includes(location) ||
        country.includes(location) ||
        continent.includes(location)
      );
    });
  }

  if (filters.guests) {
    filteredVenues = filteredVenues.filter((venue) => {
      return venue.maxGuests >= filters.guests;
    });
  }

  if (filters.sort) {
    if (filters.sort === "price-asc") {
      filteredVenues.sort((a, b) => a.price - b.price);
    }
    if (filters.sort === "price-desc") {
      filteredVenues.sort((a, b) => b.price - a.price);
    }
    if (filters.sort === "rating-asc") {
      filteredVenues.sort((a, b) => a.rating - b.rating);
    }
    if (filters.sort === "rating-desc") {
      filteredVenues.sort((a, b) => b.rating - a.rating);
    }
  }

  renderVenueList(filteredVenues);
});
