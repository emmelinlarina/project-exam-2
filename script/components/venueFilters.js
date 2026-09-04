export function renderVenueFilters(onFilterChange) {
  const filterSection = document.getElementById("venue-filters");

  filterSection.innerHTML = /*html*/ `
    <div class="px-4 md:px-8 lg:px-12">
        <div class="rounded-3xl border bg-white p-4 shadow-sm">

            <div class="grid grid-cols-2 gap-3 lg:grid-cols-3">

                <div class="col-span-2 lg:col-span-1">
                    <label for="venue-location" class="block text-xs font-medium mb-1">
                        Location
                    </label>
                    <input 
                    id="venue-location" 
                    type="text" 
                    placeholder="City or Country" 
                    class="w-full rounded-2xl border px-3 py-2 text-sm" 
                    />
                </div>

                <div>
                    <label for="check-in" class="block text-xs font-medium mb-1">
                        Check-in
                    </label>
                    <input 
                    id="check-in" 
                    type="date" 
                    class="w-full rounded-2xl border px-3 py-2 text-sm" 
                    />
                </div>

                <div>
                    <label for="check-out" class="block text-xs font-medium mb-1">
                        Check-out
                    </label>
                    <input 
                    id="check-out" 
                    type="date" 
                    class="w-full rounded-2xl border px-3 py-2 text-sm" 
                    />
                </div>

                <div>
                    <label for="guests" class="block text-xs font-medium mb-1">
                        Guests
                    </label>
                    <input 
                    id="guests" 
                    type="number" 
                    min="1" 
                    value="1" 
                    class="w-full rounded-2xl border px-3 py-2 text-sm" 
                    />
                </div>
                
                <div>
                    <label for="venue-sort" class="block text-xs font-medium mb-1">
                        Sort
                    </label>
                    <select 
                        id="venue-sort" 
                        class="w-full rounded-2xl border px-3 py-2 text-sm"
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="rating-asc">Rating (Low to High)</option>
                        <option value="rating-desc">Rating (High to Low)</option>
                        </select>
                        </div>

                    <div class="flex items-end">
                        <button 
                        type="button" 
                        id="apply-filters"
                        class="w-full rounded-2xl bg-accent-blue px-4 py-2 text-sm font-medium text-white"
                        >
                        Search
                        </button>
                    </div>  
            </div>
        </div>
    </div>
    `;

  const locationInput = document.getElementById("venue-location");
  const checkInInput = document.getElementById("check-in");
  const checkOutInput = document.getElementById("check-out");
  const guestsInput = document.getElementById("guests");
  const sortSelect = document.getElementById("venue-sort");
  const applyButton = document.getElementById("apply-filters");
  const today = new Date().toISOString().split("T")[0];

  checkInInput.min = today;
  checkOutInput.min = today;

  checkInInput.addEventListener("change", () => {
    checkOutInput.min = checkInInput.value;

    if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
      checkOutInput.value = "";
    }
  });

  applyButton.addEventListener("click", () => {
    onFilterChange({
      location: locationInput.value.trim(),
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      guests: Number(guestsInput.value),
      sort: sortSelect.value,
    });
  });
}
