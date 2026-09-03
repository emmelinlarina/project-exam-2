import { renderHeader } from "../components/header.js";
import { renderHero } from "../components/hero.js";
import { renderPopularStays } from "../components/popularStays.js";
import { renderMoreStays } from "../components/moreStays.js";
import { getVenues } from "../api/venues.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderVenueList } from "../render/venueList.js";

renderHeader();

const home = document.getElementById("home");

home.innerHTML = /*html*/ `
  <section id="hero"></section>
  <section id="popular-stays"></section>
  <section id="more-stays"></section>
  <section id="venue-search"></section>
  <section id="venue-list"></section>
  <section id="why-holidaz"></section>
`;

renderHero();

async function loadVenues() {
  try {
    const response = await getVenues();
    const venues = response.data;

    console.log("Venues", response.data);

    renderPopularStays(venues);
    renderMoreStays(venues);
    renderVenueList(venues.slice(0, 8));
  } catch (error) {
    console.error("Failed to load venues:", error);
  }
}

loadVenues();
renderSearchBar();
