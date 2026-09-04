export function renderVenueFilters(onSortChange) {
  const filterSection = document.getElementById("venue-filters");

  filterSection.innerHTML = /*html*/ `
        <div class="px-4 md:px-8 lg:px-12 mb-4">
            <label for="venue-sort" class="text-sm font-medium ">
                Sort by
            </label>

            <select 
            id="venue-sort" 
            class="ml-2 rounded-full border px-3 py-2 text-sm"
            >
                <option value="default">Default</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating-asc">Rating (Low to High)</option>
                <option value="rating-desc">Rating (High to Low)</option>
            </select>
        </div>
    `;
  const sortSelect = document.getElementById("venue-sort");

  sortSelect.addEventListener("change", () => {
    onSortChange(sortSelect.value);
  });
}
