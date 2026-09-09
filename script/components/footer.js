export function renderFooter() {
  const footer = document.getElementById("footer");

  footer.innerHTML = /*html*/ `
    <div class="mt-10 border px-4 py-8 md:px-8 lg:px-12">
        <div class="grid gap-6 md:grid-cols-3">

        <div>
            <h2 class="font-body text-lg font-semibold">
              Holidaze
            </h2>
            <p class="mt-2 text-sm text-secondary">
              Find your next stay.
            </p>
        </div>

        <nav aria-label="Footer Navigation">
            <h3 class="text-sm font-semibold">
              Explore
            </h3>

            <ul class="mt-2 space-y-2 text-sm text-secondary">
              <li><a href="./index.html">Home</a></li>
              <li><a href="#venue-list">Venues</a></li>
            </ul>
        </nav>

        <div>
            <h3 class="text-sm font-semibold">
              Account
            </h3>
            <ul class="mt-2 space-y-2 text-sm text-secondary">
              <li><a href="./login.html">Log in</a></li>
              <li><a href="./register.html">Register</a></li>
            </ul>
        </div>
        
        <div>
            <p class="mt-8 border-t pt-4 text-sm text-secondary text-center">
              &copy; 2026 Holidaze. All rights reserved.
            </p>
      </div>
    </div>
  `;
}
