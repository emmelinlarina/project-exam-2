export function renderSearchBar(onSearch) {
  const searchSection = document.getElementById("venue-search");

  searchSection.innerHTML = /*html*/ `
    <div class="px-4 py-4 md:px-8 lg:px-12">
      <div class="mx-auto max-w-5xl">

        <div class="mb-8 text-center">

          <h2 class="mt-2 text-3xl font-semibold font-body text-black">
            Find your perfect stay
          </h2>
        </div>

        <form 
            id="venue-search-form" 
            class="grid overflow-hidden rounded-3xl border-2 border-accent-tan
                  bg-white md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]"
          >
          <div class="py-4 px-5 lg:border-r lg:border-accent-brown/20">
              <label 
                for="search-location"
                class="mb-1 block text-xs font-semibold text-black">
                Location
              </label>

                <input 
                  id="search-location" 
                  type="text" 
                  placeholder="Where are you going?" 
                  class="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
                />
            </div>

          <div class="border-t border-accent-brown/20 py-4 px-5 
                      md:border md:border-t-0
                      lg:border-t-0 lg:border-r">

            <label 
              for="search-check-in" 
              class="mb-1 block text-xs font-semibold text-black">
              Check-in
            </label>
            
            <input 
              id="search-check-in" 
              type="date" 
              class="w-full bg-transparent text-sm text-black outline-none"
            />
          </div>

        <div class="border-t border-accent-brown/20 py-4 px-5 
                    md:border
                    lg:border-t-0 lg:border-r">
                    
          <label 
            for="search-check-out" 
            class="mb-1 block text-xs font-semibold text-black">
            Check-out
          </label>

          <input 
            id="search-check-out" 
            type="date" 
            class="w-full bg-transparent text-sm text-black outline-none"
          />
        </div>

        <div class="border-t border-accent-brown/20 py-4 px-5 
                    md:border
                    lg:border-t-0 lg:border-r">

          <label 
              for="search-guests" 
              class="mb-1 block text-xs font-semibold text-black"
              >
                Guests
          </label>

          <input 
            id="search-guests" 
            type="number" 
            min="1"
            value="1" 
            step="1"
            class="w-full bg-transparent text-sm text-black outline-none"
          />
        </div>

        <div class="flex items-center justify-center p-3 md:col-span-2 lg:col-span-1">
            <button 
                type="submit" 
                class="flex h-12 w-full items-center justify-center gap-2
                       rounded-2xl bg-accent-blue px-5 
                       text-sm font-semibold text-white
                       transition hover:opacity-90
                       focus:outline-none focus:visible:ring-2 
                       focus-visible:ring-accent-brown lg:w-12 lg:px-0"
                aria-label="Search for stays"
                >
                  <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>

                  <span class="lg:sr-only">
                    Search
                  </span>
            </button>
          </div>

        </form>
        
        <div id="search-message-container"></div>

        </div>
    </div>
    `;

  const form = document.getElementById("venue-search-form");
  const locationInput = document.getElementById("search-location");
  const checkInInput = document.getElementById("search-check-in");
  const checkOutInput = document.getElementById("search-check-out");
  const guestsInput = document.getElementById("search-guests");
  const message = document.getElementById("search-message-container");

  const today = new Date().toISOString().split("T")[0];

  checkInInput.setAttribute("min", today);
  checkOutInput.setAttribute("min", today);

  checkInInput.addEventListener("change", () => {
    const checkInDate = checkInInput.value;

    checkOutInput.setAttribute("min", checkInDate || today);

    if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
      checkOutInput.value = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    message.innerHTML = "";

    onSearch({
      location: locationInput.value.trim(),
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      guests: guestsInput.value,
    });
  });
}
