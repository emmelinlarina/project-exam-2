export function renderSearchBar(onSearch) {
  const searchSection = document.getElementById("venue-search");

  searchSection.innerHTML = /*html*/ `
    <div class="px-4 py-4 md:px-8 lg:px-12">
        
        <form 
        id="venue-search-form" 
        class="grid gap-3 rounded-3xl border bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]"
        >
        <div>
          <label for="search-location" class="block text-xs font-medium mb-1">
            Location
          </label>

            <input 
              id="search-location" 
              type="text" 
              placeholder="City or country" 
              class="w-full rounded-2xl border px-3 py-2 text-sm"
            />
        </div>

        <div>
          <label for="search-check-in" class="block text-xs font-medium mb-1">
            Check-in
          </label>
          <input 
            id="search-check-in" 
            type="date" 
            class="w-full rounded-2xl border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label for="search-check-out" class="block text-xs font-medium mb-1">
            Check-out
          </label>
          <input 
            id="search-check-out" 
            type="date" 
            class="w-full rounded-2xl border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label for="search-guests" class="block text-xs font-medium mb-1">
            Guests
          </label>
          <input 
            id="search-guests" 
            type="number" 
            min="1"
            value="1" 
            class="w-full rounded-2xl border px-3 py-2 text-sm"
          />
        </div>

        <div class="flex items-end">
            <button 
            type="submit" 
            class="w-full rounded-2xl bg-accent-blue px-5 py-2 text-sm font-medium text-white lg:w-auto"
            aria-label="Search for stays"
            >
              Search
            </button>
        </form>
        </div>

        <div id="search-message-container"></div>
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

    if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
      checkOutInput.value = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    message.innerHTML = "";

    onSearch({
      location: locationInput.value,
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      guests: guestsInput.value,
    });
  });
}
