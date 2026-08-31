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
      class="font-logo"
      >
      Holidaze
      </a>

      <button 
      type="button"
      class="text-white text-xl md:hidden"
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


  `;
}
