import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";
import { renderPopularStays } from "./components/popularStays.js";
import { renderMoreStays } from "./components/moreStays.js";

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
