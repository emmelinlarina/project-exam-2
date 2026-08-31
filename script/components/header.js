export function renderHeader() {
  const header = document.getElementById("header");

  header.innerHTML = `
    <nav 
    class="flex items-center justify-between bg-primary text-white px-4 py-3"
    aria-label="Main navigation"
    >
      <a 
      href="/" 
      aria-label="Holidaze home"
      class="font-logo text-lg"
      >
      Holidaze
      </a>

      <button 
      type="button"
      class="flex items-center justify-center text-white text-xl md:hidden"
      aria-label="Open navigation menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
      >
        <i class="fa-solid fa-bars" aria-hidden="true"></i>
      </button>

      <div class="hidden md:flex md:items-center md:gap-6">
        <a href="#venue-list" class="block py-2 text-white">Venues</a>
        <a href="./login" class="block py-2 text-white">Login</a>
        <a href="./register" class="block py-2 text-white">Register</a>
      </div>
    </nav>

    <div 
      id="mobile-menu" 
      class="hidden bg-primary px-4 py-4 md:hidden"
      >
        <a href="#venue-list" class="block py-2 text-white">Venues</a>
        <a href="./login" class="block py-2 text-white">Login</a>
        <a href="./register" class="block py-2 text-white">Register</a>
      </div>
  `;

  const menuButton = header.querySelector("button");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("hidden");
  });
}
