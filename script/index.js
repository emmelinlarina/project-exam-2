import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";

renderHeader();

const home = document.getElementById("home");

home.innerHTML = /*html*/ `
  <section id="hero"></section>
  <section id="venue-search"></section>
  <section id="venue-list"></section>
`;
renderHero();
