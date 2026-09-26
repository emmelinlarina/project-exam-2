import { renderHomeSkeleton } from "../components/skeleton.js";
import { renderHeader } from "../components/header.js";
import { renderHero } from "../components/hero.js";
import { renderPopularStays } from "../components/popularStays.js";
import { getVenues } from "../api/venues.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderVenueFilters } from "../components/venueFilters.js";
import { renderVenueList } from "../render/venueList.js";
import { isVenueAvailable } from "../utils/isVenueAvailable.js";
import { renderFooter } from "../components/footer.js";

let allVenues = [];
let currentVenues = [];
let baseVenues = [];

renderHeader();
renderFooter();

const home = document.getElementById("home");

home.innerHTML = /*html*/ `
  <section id="hero"></section>
  <section id="popular-stays"></section>
  <section id="venue-search"></section>
  <section id="results-info"></section>
  <section id="venue-filters"></section>
  <section id="venue-list"></section>
  <section id="why-holidaz"></section>
`;

renderHomeSkeleton();

function renderResultsInfo(count) {
  const resultsInfo = document.getElementById("results-info");

  if (count === 0) {
    resultsInfo.innerHTML = /*html*/ `
    <div class="px-4 py-6 text-center md:px-8 lg:px-12">
      <p class="font-body text-lg font-semibold">
        No stays found.
      </p>
      <p class="mt-1 text-sm">
        Try adjusting your search criteria.
      </p>
    </div>
    `;
    return;
  }

  resultsInfo.innerHTML = /*html*/ `
    <div class="px-4 pt-4 md:px-8 lg:px-12">
      <div class="mx-auto max-w-5xl">
      <p class="whitespace-nowrap text-sm font-medium">
        ${count} ${count === 1 ? "stay" : "stays"} found
      </p>
      
    </div>
  `;
}

async function loadVenues() {
  try {
    const response = await getVenues();
    const venues = response.data;

    allVenues = venues;
    baseVenues = venues;
    currentVenues = venues;

    renderHero(venues);
    renderPopularStays(venues);
    renderSearchBar(handleSearch);
    renderVenueFilters(handleFilters);
    renderVenueList(venues);
  } catch (error) {
    console.error("Failed to load venues:", error);
  }
}

loadVenues();

function handleSearch(search) {
  let filteredVenues = [...allVenues];

  if (search.location) {
    const location = search.location.toLowerCase();

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

  if (search.guests) {
    filteredVenues = filteredVenues.filter(
      (venue) => venue.maxGuests >= search.guests,
    );
  }

  if (search.checkIn && search.checkOut) {
    filteredVenues = filteredVenues.filter((venue) => {
      return isVenueAvailable(venue, search.checkIn, search.checkOut);
    });
  }

  baseVenues = filteredVenues;
  currentVenues = filteredVenues;

  renderResultsInfo(currentVenues.length);
  renderVenueList(currentVenues);
}

function handleFilters(filters) {
  const filteredVenues = [...baseVenues];

  if (filters.sort === "price-asc") {
    filteredVenues.sort((a, b) => a.price - b.price);
  }
  if (filters.sort === "price-desc") {
    filteredVenues.sort((a, b) => b.price - a.price);
  }
  if (filters.sort === "rating-desc") {
    filteredVenues.sort((a, b) => b.rating - a.rating);
  }

  currentVenues = filteredVenues;
  renderVenueList(currentVenues);
}
