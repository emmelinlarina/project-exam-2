export function renderFooter() {
  const footer = document.getElementById("footer");

  footer.innerHTML = /*html*/ `
    <footer class="bg-primary px-6 py-8 text-white lg:px-12">
        <div 
            class="mx-auto grid max-w-5xl gap-8
                    sm:grid-cols-2 lg:grid-cols-[auto_auto_auto_auto] 
                    lg:items-start"
        >

          <div>
            <a 
              href="./index.html"
              class="inline-block focus:outline-none 
                    focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Holidaze home"
            >
              <img
                src="./assets/images/Holidaze_logo_w.png"
                alt="Holidaze logo"
                class="h-26 w-auto"
              />
            </a>
          </div>

            <nav aria-label="Hosting">
                <h2 class="flex items-center gap-2 text-sm font-semibold">
                  <i class="fa-solid fa-house"
                      aria-hidden="true">
                  </i>
                  Hosting
                </h2>

                <ul class="mt-2 space-y-1 text-sm text-white">
                  <li><a href="./register.html">Become a Host</a></li>
                  <li><a href="#">Venue managers</a></li>
                  <li><a href="#">Hosting Tips</a></li>
                </ul>
            </nav>

            <nav aria-label="Help and FAQ">
                <h2 class="flex items-center gap-2 text-sm font-semibold">
                  <i class="fa-solid fa-circle-question"
                      aria-hidden="true">
                  </i>
                  Help and FAQ
                </h2>

                <ul class="mt-2 space-y-1 text-sm text-white">
                  <li><a href="./index.html#venue-search">Find stays</a></li>
                  <li><a href="./login.html">Bookings</a></li>
                  <li><a href="./index.html#popular-stays">Popular stays</a></li>
                </ul>
            </nav>

            <div class="lg:min-w-72">
              <h2 class="text-sm font-semibold">
                Newsletter
                </h2>

                <p class="mt-2 text-xs text-white">
                  Stay updated with Holidaze.
                </p>

                <div class="mt-4 flex gap-2 text-lg">
                  <input
                    type="email"
                    placeholder="Your email"
                    aria-label="Your email"
                    class="min-w-0 flex-1 rounded-md border border-white bg-primary 
                           px-3 py-2 text-sm text-white placeholder-white/70 
                           focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="button"
                    class="rounded-md bg-white px-3 py-2 
                           text-sm font-semibold text-primary 
                           focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
    </footer>
  `;
}
