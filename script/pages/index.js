import { renderHeader } from "../components/header.js";
import { renderHero } from "../components/hero.js";
import { renderPopularStays } from "../components/popularStays.js";
import { renderMoreStays } from "../components/moreStays.js";
import { getVenues } from "../api/venues.js";

async function loadVenues() {
  try {
    const response = await getVenues();

    console.log("Venues", response.data);
  } catch (error) {
    console.error("Failed to load venues:", error);
  }
}

renderHeader();

const home = document.getElementById("home");

home.innerHTML = /*html*/ `
  <section id="hero"></section>
  <section id="venue-search"></section>
  <section id="venue-list"></section>
  <section id="more-stays"></section>
`;

const venueList = document.getElementById("venue-list");

renderHero();
renderPopularStays();
renderMoreStays();
loadVenues();
