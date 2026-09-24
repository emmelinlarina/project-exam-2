import { getProfile, clearAuth } from "../utils/storage.js";

export function renderHeader() {
  const header = document.getElementById("header");
  const profile = getProfile();

  const isLoggedIn = Boolean(profile);
  const isVenueManager = profile?.venueManager === true;

  const navigationLinks = !isLoggedIn
    ? /*html*/ `
        <a href="#venue-list">Venues</a>
        <a href="./login.html">Log in</a>
        <a href="./register.html">Register</a>
      `
    : /*html*/ `
        <a href="./index.html">Venues</a>
        <a href="./profile.html">Profile </a>

        ${
          isVenueManager
            ? /*html*/ `
        <a href="./manage-venues.html">Manage Venues</a>
        `
            : ""
        }
        
        <button
          type="button"
          class="logout-button text-left uppercase"
        >
          Log out
        </button>
      `;

  header.innerHTML = /*html*/ `
    <nav 
      class="flex h-16 items-center justify-between bg-gray-light text-primary font-semibold px-4 md:px-8 lg:px-12"
      aria-label="Main navigation"
      >
        <a 
          href="./index.html" 
          aria-label="Holidaze home"
          class="flex items-center"
          >
          <img src="./assets/images/Holidaze_logo_green.png" alt="Holidaze logo" class="h-20 w-auto" />
       </a>

        <button 
          id="menu-button"
          type="button"
          class="flex items-center justify-center text-primary   text-xl md:hidden"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
          >
            <i class="fa-solid fa-bars" aria-hidden="true"></i>
        </button>

        <div class="hidden uppercase md:flex md:items-center md:gap-6"
        >
          ${navigationLinks}

        </div>
      </nav>

    <div 
      id="mobile-menu" 
      class="hidden bg-primary text-white px-4 py-4 md:hidden"
      >
        <div class="flex flex-col gap-4"
        >
        ${navigationLinks}
        </div>
      </div>
  `;

  const menuButton = header.querySelector("#menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = menuButton.querySelector("i");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("hidden");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");
  });

  const logoutButtons = header.querySelectorAll(".logout-button");

  logoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearAuth();
      window.location.href = "./index.html";
    });
  });
}
